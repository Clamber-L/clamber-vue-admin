import { createApp } from 'vue'
// eslint-disable-next-line import/no-unresolved
import 'uno.css'
import '@unocss/reset/eric-meyer.css'
import router from '@/router'
import { pinia } from '@/store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import '@/assets/icons/system/iconfont.js' // 系统彩色图标
import '@/assets/icons/system/iconfont.css' // 系统图标
import '@/assets/styles/el-ui.scss'

const app = createApp(App)
app.use(router).use(pinia).mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.config.errorHandler = (err) => {
    // if (err instanceof AppException) {
    //     window.$message.error(err.message)
    //     return
    // }
    throw err
}
