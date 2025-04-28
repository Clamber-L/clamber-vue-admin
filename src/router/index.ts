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
import { setWorktab } from '@/utils/worktab.ts'

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

const routes: Array<RouteRecordRaw> = [
    { path: '/', redirect: HOME_PAGE },
    {
        path: RoutersAlias.Index,
        name: 'Dashboard',
        component: () => import('@/views/index/index.vue'),
        meta: { title: 'menus.dashboard', keepAlive: false },
        children: [
            {
                path: RoutersAlias.Dashboard,
                name: 'Console',
                component: () => import('@/views/dashboard/index.vue'),
                meta: { title: 'menus.dashboard.console', keepAlive: false }
            }
        ]
    },
    {
        path: RoutersAlias.Login,
        name: 'Login',
        component: () => import('@/views/login/index.vue'),
        meta: { title: 'menus.login.title', isHideTab: true, setTheme: true }
    },
    {
        path: RoutersAlias.Register,
        name: 'Register',
        component: () => import('@/views/register/index.vue'),
        meta: { title: 'menus.register.title', isHideTab: true, noLogin: true, setTheme: true }
    },
    {
        path: RoutersAlias.ForgetPassword,
        name: 'ForgetPassword',
        component: () => import('@/views/forget_password/index.vue'),
        meta: {
            title: 'menus.forgetPassword.title',
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
    setWorktab(to)
    setPageTitle(to)
    return next()
})

async function getMenuData(): Promise<void> {
    try {
        // 获取菜单列表
        const menuList = asyncRoutes

        // 如果菜单列表为空，执行登出操作并跳转到登录页
        if (!Array.isArray(menuList) || menuList.length === 0) {
            // closeLoading()
            // useUserStore().logOut()
            throw new Error('获取菜单列表失败，请重新登录！')
        }

        // 设置菜单列表
        useMenuStore().setMenuList(menuList as [])
        // 注册异步路由
        // registerAsyncRoutes(router, menuList)
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

export default router
