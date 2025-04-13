import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { PiniaSharedState } from 'pinia-shared-state'

export const pinia = createPinia()

pinia
    .use(
        createPersistedState({
            auto: true
        })
    )
    .use(
        PiniaSharedState({
            // 为所有存储启用插件。默认为true。
            enable: false,
            // 如果设置为true，此选项卡将尝试立即从另一个选项卡恢复共享状态。默认为true。
            initialize: false,
            // 强制一个类型。native、idb、localstorage或node中的一个。默认为本地。
            // native使用new BroadcastChannel来进行广播通信
            type: 'native'
        })
    )
