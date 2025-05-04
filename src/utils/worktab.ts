import { RouteLocationNormalized } from 'vue-router'
import { HOME_PAGE } from '@/router'
import { useWorkTabStore } from '@/store/worktab.ts'
import { useSettingStore } from '@/store/settings.ts'

/**
 * 根据当前路由信息设置工作标签页（worktab）
 * @param to 当前路由对象
 */

export const setWorkTab = (to: RouteLocationNormalized): void => {
    const workTabStore = useWorkTabStore()
    const { meta, path, name, params, query } = to
    if (!meta.isHideTab) {
        if (useSettingStore().showWorkTab || path === HOME_PAGE) {
            workTabStore.openTab({
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
