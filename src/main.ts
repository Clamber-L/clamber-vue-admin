import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import { initStore } from './store' // Store
import { initRouter } from './router' // Router
import { registerGlobComp } from './components' // 注册全局组件
import '@/assets/styles/reset.scss' // 重置HTML样式
import '@/assets/styles/app.scss' // 全局样式
import '@/assets/styles/pages.scss' // 公共页面样式
import '@/assets/styles/el-ui.scss' // 优化element样式
import '@/assets/styles/mobile.scss' // 移动端样式优化
import '@/assets/styles/change.scss' // 主题切换过渡优化
import '@/assets/styles/theme-animation.scss' // 主题切换动画
import '@/assets/icons/system/iconfont.js' // 系统彩色图标
import '@/assets/icons/system/iconfont.css' // 系统图标
import '@/assets/styles/el-light.scss' // Element 自定义主题（亮色）
import '@/assets/styles/el-dark.scss' // Element 自定义主题（暗色）
import '@/assets/styles/dark.scss' // 系统主题
import { setupGlobDirectives } from './directives'

const app = createApp(App)
initStore(app)
initRouter(app)
registerGlobComp(app)
setupGlobDirectives(app)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')
