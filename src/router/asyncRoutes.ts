/**
 * 菜单列表、异步路由
 *
 * 支持两种模式:
 * 1. 前端静态配置 - 直接使用本文件中定义的路由配置
 * 2. 后端动态配置 - 后端返回菜单数据，前端解析生成路由
 *
 * 菜单标题（title）:
 * 可以是 i18n 的 key，也可以是字符串，比如：'用户列表'
 */
import { MenuListType } from '@/typings/modules/meun'
import { RoutersAlias } from '@/router/router_alias.ts'

export const asyncRoutes: MenuListType[] = [
    {
        id: '1',
        name: 'Index',
        path: RoutersAlias.Dashboard,
        component: RoutersAlias.Dashboard,
        meta: {
            title: '首页',
            icon: '&#xe721;',
            keepAlive: false
        }
        // children: [
        //     {
        //         id: '101',
        //         path: '/dashboard',
        //         name: 'Dashboard',
        //         component: RoutersAlias.Dashboard,
        //         meta: {
        //             title: '仪表盘',
        //             keepAlive: true
        //         }
        //     }
        // ]
    }
]
