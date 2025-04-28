import { RouteLocationNormalized } from 'vue-router'
import { HOME_PAGE } from '@/router'
import { useWorktabStore } from '@/store/worktab.ts'
import { useSettingStore } from '@/store/settings.ts'
import { getIframeRoutes } from './menu'
import { isIframe } from './utils'

/**
 * 根据当前路由信息设置工作标签页（worktab）
 * @param to 当前路由对象
 */

export const setWorktab = (to: RouteLocationNormalized): void => {
    const worktabStore = useWorktabStore()
    const { meta, path, name, params, query } = to
    if (!meta.isHideTab) {
        // 如果是 iframe 页面，则特殊处理工作标签页
        if (isIframe(path)) {
            const iframeRoute = getIframeRoutes().find((route: any) => route.path === to.path)

            if (iframeRoute?.meta) {
                worktabStore.openTab({
                    title: iframeRoute.meta.title,
                    path,
                    name: name as string,
                    keepAlive: meta.keepAlive as boolean,
                    params,
                    query
                })
            }
        } else if (useSettingStore().showWorkTab || path === HOME_PAGE) {
            worktabStore.openTab({
                title: meta.title as string,
                path,
                name: name as string,
                keepAlive: meta.keepAlive as boolean,
                params,
                query
            })
        }
    }
}
