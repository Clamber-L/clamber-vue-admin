import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const { BASE_URL } = import.meta.env

const routes: Array<RouteRecordRaw> = [
    // {
    //     path: '/login',
    //     name: 'login',
    //     component: () => import('@/views/login-window/Login.vue')
    // }
]

const router: any = createRouter({
    history: createWebHistory(BASE_URL),
    routes
})

export default router
