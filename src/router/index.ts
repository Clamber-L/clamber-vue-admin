import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router'
import { RoutersAlias } from '@/router/router_alias.ts'
import { useUserStore } from '@/store/user.ts'

const { BASE_URL } = import.meta.env

export const HOME_PAGE = '/dashboard'

const routes: Array<RouteRecordRaw> = [
    { path: '/', redirect: HOME_PAGE },
    {
        path: RoutersAlias.Dashboard,
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: 'menus.dashboard', keepAlive: false }
    },
    {
        path: RoutersAlias.Login,
        name: 'Login',
        component: () => import('@/views/login/index.vue')
    },
    {
        path: RoutersAlias.Register,
        name: 'Register',
        component: () => import('@/views/register/index.vue')
    },
    {
        path: RoutersAlias.ForgetPassword,
        name: 'ForgetPassword',
        component: () => import('@/views/forget_password/index.vue')
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

router.beforeEach((to, _, next) => {
    const { isLogin } = useUserStore()

    console.log('to.meta:', to.meta)
    if (!isLogin && to.path !== '/login') {
        return next('/login')
    }

    // 检查路由是否存在，若不存在则跳转至404页面
    if (to.matched.length === 0) {
        return next('/exception/404')
    }

    return next()
})

export default router
