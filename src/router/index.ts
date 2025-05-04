import {
    createRouter,
    createWebHistory,
    RouteLocationNormalized,
    Router,
    RouteRecordRaw
} from 'vue-router'
import { RoutersAlias } from '@/router/router_alias.ts'
import { useUserStore } from '@/store/user.ts'
import NProgress from 'nprogress'
import { useSettingStore } from '@/store/settings.ts'
import { asyncRoutes } from '@/router/asyncRoutes.ts'
import { useMenuStore } from '@/store/menu.ts'
import AppConfig from '@/config'
import { setWorkTab } from '@/utils/worktab.ts'
import { processRoute } from '@/utils/menu.ts'
import { MenuListType } from '@/typings/modules/meun'

/** 顶部进度条配置 */
NProgress.configure({
    easing: 'ease',
    speed: 600,
    showSpinner: false,
    trickleSpeed: 200,
    parent: 'body'
})

/** 扩展的路由配置类型 */
export type AppRouteRecordRaw = RouteRecordRaw & {
    hidden?: boolean
}

const { BASE_URL } = import.meta.env

export const HOME_PAGE = '/dashboard'

const routes: Array<AppRouteRecordRaw> = [
    { path: '/', redirect: HOME_PAGE },
    {
        path: RoutersAlias.Index,
        name: 'Dashboard',
        component: () => import('@/views/index/index.vue'),
        meta: { title: '仪表盘', keepAlive: false },
        children: [
            {
                path: RoutersAlias.Dashboard,
                name: 'Console',
                component: () => import('@/views/dashboard/index.vue'),
                meta: { title: '工作台', keepAlive: false }
            }
        ]
    },
    {
        path: RoutersAlias.Login,
        name: 'Login',
        component: () => import('@/views/login/index.vue'),
        meta: { title: '登录', isHideTab: true, setTheme: true }
    },
    {
        path: RoutersAlias.Register,
        name: 'Register',
        component: () => import('@/views/register/index.vue'),
        meta: { title: '注册', isHideTab: true, noLogin: true, setTheme: true }
    },
    {
        path: RoutersAlias.ForgetPassword,
        name: 'ForgetPassword',
        component: () => import('@/views/forget_password/index.vue'),
        meta: {
            title: '忘记密码',
            isHideTab: true,
            noLogin: true,
            setTheme: true
        }
    },
    {
        path: '/exception',
        name: 'Exception',
        meta: { title: 'menus.exception.title' },
        children: [
            {
                path: '/:catchAll(.*)',
                name: 'Exception404',
                component: () => import('@/views/exception/404.vue'),
                meta: { title: '404' }
            }
        ]
    }
]

const router: Router = createRouter({
    history: createWebHistory(BASE_URL),
    routes
})

router.beforeEach(async (to, _, next) => {
    const settingStore = useSettingStore()
    if (settingStore.showProgress) NProgress.start()

    const { isLogin } = useUserStore()

    console.log('to.meta:', to.meta)
    if (!isLogin && to.path !== '/login') {
        return next('/login')
    }

    // 检查路由是否存在，若不存在则跳转至404页面
    if (to.matched.length === 0) {
        return next('/exception/404')
    }

    await getMenuData()
    // 设置工作标签页和页面标题
    setWorkTab(to)
    setPageTitle(to)
    return next()
})

async function getMenuData(): Promise<void> {
    try {
        // 获取菜单列表
        const menuList = asyncRoutes

        const processedMenuList: MenuListType[] = menuList.map((route) => processRoute(route))

        // 如果菜单列表为空，执行登出操作并跳转到登录页
        if (!Array.isArray(menuList) || menuList.length === 0) {
            // closeLoading()
            // useUserStore().logOut()
            throw new Error('获取菜单列表失败，请重新登录！')
        }

        // 设置菜单列表
        useMenuStore().setMenuList(processedMenuList as [])
        // 注册异步路由
        registerAsyncRoutes(router, menuList)
        // 标记路由已注册
        // isRouteRegistered.value = true
        // 关闭加载动画
        // closeLoading()
    } catch (error) {
        console.error('获取菜单列表失败:', error)
        throw error
    }
}

/**
 * 设置页面标题，根据路由元信息和系统信息拼接标题
 * @param to 当前路由对象
 */
export const setPageTitle = (to: RouteLocationNormalized): void => {
    const { title } = to.meta
    if (title) {
        setTimeout(() => {
            document.title = `${String(title)} - ${AppConfig.systemInfo.name}`
        }, 150)
    }
}

/**
 * 动态导入 views 目录下所有 .vue 组件
 */
const modules: Record<string, () => Promise<any>> = import.meta.glob('../views/**/*.vue')

/**
 * 注册异步路由
 * 将接口返回的菜单列表转换为 Vue Router 路由配置，并添加到传入的 router 实例中
 * @param r Vue Router 实例
 * @param menuList 接口返回的菜单列表
 */
function registerAsyncRoutes(r: Router, menuList: MenuListType[]): void {
    // 遍历菜单列表，注册路由
    menuList.forEach((route) => {
        if (route.name && !r.hasRoute(route.name)) {
            const routeConfig = convertRouteComponent(route)
            r.addRoute(routeConfig as RouteRecordRaw)
        }
    })
}

interface ConvertedRoute extends Omit<RouteRecordRaw, 'children'> {
    id?: string
    children?: ConvertedRoute[]
    component?: RouteRecordRaw['component'] | (() => Promise<any>)
}

function convertRouteComponent(route: MenuListType): ConvertedRoute {
    const { component, children, ...routeConfig } = route

    // 基础路由配置
    const converted: ConvertedRoute = {
        ...routeConfig,
        component: undefined
    }

    try {
        if (route.meta.isInMainContainer) {
            handleLayoutRoute(converted, route, component)
        } else {
            // 处理普通路由组件
            handleNormalRoute(converted, component, route.name)
        }

        // 递归处理子路由
        if (children?.length) {
            converted.children = children.map((child) => convertRouteComponent(child))
        }
        return converted
    } catch (error) {
        console.error(`路由转换失败: ${route.name}`, error)
        throw error
    }
}

// 处理一级级菜单路由
function handleLayoutRoute(
    converted: ConvertedRoute,
    route: MenuListType,
    component: string | undefined
): void {
    converted.component = () => import('@/views/index/index.vue')
    converted.path = `/${(route.path?.split('/')[1] || '').trim()}`
    converted.name = ''

    converted.children = [
        {
            id: route.id,
            path: route.path,
            name: route.name,
            component: loadComponent(component as string, route.name),
            meta: route.meta
        }
    ]
}

// 处理普通路由
function handleNormalRoute(converted: any, component: string | undefined, routeName: string): void {
    if (component) {
        converted.component = component
            ? RoutersAlias[component as keyof typeof RoutersAlias] ||
              loadComponent(component as string, routeName)
            : undefined
    }
}

/**
 * 根据组件路径动态加载组件
 * @param componentPath 组件路径（不包含 ../../views 前缀和 .vue 后缀）
 * @param routeName 当前路由名称（用于错误提示）
 * @returns 组件加载函数
 */
function loadComponent(componentPath: string, routeName: string): () => Promise<any> {
    const fullPath = `../views${componentPath}/index.vue`
    const module = modules[fullPath]
    if (!module && componentPath !== '') {
        console.error(`未找到组件：${routeName} ${fullPath}`)
    }
    return module as () => Promise<any>
}

export default router
