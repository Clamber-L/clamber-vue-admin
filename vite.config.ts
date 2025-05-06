import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'
import terser from '@rollup/plugin-terser'
import UnoCSS from '@unocss/vite'
import { getRootPath, getSrcPath, resolvePath } from './build/config/getPath'

/** ! 不需要优化前端打包(如开启gzip) */
export default defineConfig(({ mode }: ConfigEnv) => {
    // 获取当前环境的配置,如何设置第三个参数则加载所有变量，而不是以“VITE_”前缀的变量
    const config = loadEnv(mode, process.cwd())
    return {
        resolve: {
            alias: {
                // 配置路径别名@
                '@': getSrcPath(),
                // 配置路径别名~(根路径)
                '~': getRootPath(),
                '@views': resolvePath('src/views'),
                '@/components': resolvePath('src/components'),
                '@/assets/img': resolvePath('src/assets/img'),
                '@icons': resolvePath('src/assets/icons'),
                '@utils': resolvePath('src/utils'),
                '@stores': resolvePath('src/store'),
                '@plugins': resolvePath('src/plugins'),
                '@styles': resolvePath('src/assets/styles')
            }
        },
        css: {
            preprocessorOptions: {
                // sass variable and mixin
                scss: {
                    api: 'modern-compiler',
                    additionalData: `
            @use "@/assets/styles/variables.scss" as *; @use "@/assets/styles/mixin.scss" as *;
          `
                }
            }
        },
        optimizeDeps: {
            include: [
                'vue',
                'vue-router',
                'pinia',
                'axios',
                '@vueuse/core',
                'echarts',
                '@wangeditor/editor',
                '@wangeditor/editor-for-vue',
                'element-plus/es/components/form/style/css',
                'element-plus/es/components/form-item/style/css',
                'element-plus/es/components/button/style/css',
                'element-plus/es/components/input/style/css',
                'element-plus/es/components/input-number/style/css',
                'element-plus/es/components/switch/style/css',
                'element-plus/es/components/upload/style/css',
                'element-plus/es/components/menu/style/css',
                'element-plus/es/components/col/style/css',
                'element-plus/es/components/icon/style/css',
                'element-plus/es/components/row/style/css',
                'element-plus/es/components/tag/style/css',
                'element-plus/es/components/dialog/style/css',
                'element-plus/es/components/loading/style/css',
                'element-plus/es/components/radio/style/css',
                'element-plus/es/components/radio-group/style/css',
                'element-plus/es/components/popover/style/css',
                'element-plus/es/components/scrollbar/style/css',
                'element-plus/es/components/tooltip/style/css',
                'element-plus/es/components/dropdown/style/css',
                'element-plus/es/components/dropdown-menu/style/css',
                'element-plus/es/components/dropdown-item/style/css',
                'element-plus/es/components/sub-menu/style/css',
                'element-plus/es/components/menu-item/style/css',
                'element-plus/es/components/divider/style/css',
                'element-plus/es/components/card/style/css',
                'element-plus/es/components/link/style/css',
                'element-plus/es/components/breadcrumb/style/css',
                'element-plus/es/components/breadcrumb-item/style/css',
                'element-plus/es/components/table/style/css',
                'element-plus/es/components/tree-select/style/css',
                'element-plus/es/components/table-column/style/css',
                'element-plus/es/components/select/style/css',
                'element-plus/es/components/option/style/css',
                'element-plus/es/components/pagination/style/css',
                'element-plus/es/components/tree/style/css',
                'element-plus/es/components/alert/style/css',
                'element-plus/es/components/radio-button/style/css',
                'element-plus/es/components/checkbox-group/style/css',
                'element-plus/es/components/checkbox/style/css',
                'element-plus/es/components/tabs/style/css',
                'element-plus/es/components/tab-pane/style/css',
                'element-plus/es/components/rate/style/css',
                'element-plus/es/components/date-picker/style/css',
                'element-plus/es/components/notification/style/css',
                'element-plus/es/components/image/style/css',
                'element-plus/es/components/statistic/style/css',
                'element-plus/es/components/watermark/style/css',
                'element-plus/es/components/config-provider/style/css',
                'element-plus/es/components/text/style/css',
                'element-plus/es/components/drawer/style/css',
                'element-plus/es/components/color-picker/style/css',
                'element-plus/es/components/backtop/style/css',
                'element-plus/es/components/message-box/style/css',
                'element-plus/es/components/skeleton/style/css',
                'element-plus/es/components/skeleton/style/css',
                'element-plus/es/components/skeleton-item/style/css',
                'element-plus/es/components/badge/style/css',
                'element-plus/es/components/steps/style/css',
                'element-plus/es/components/step/style/css',
                'element-plus/es/components/avatar/style/css',
                'element-plus/es/components/descriptions/style/css',
                'element-plus/es/components/descriptions-item/style/css',
                'element-plus/es/components/checkbox-group/style/css',
                'element-plus/es/components/progress/style/css',
                'element-plus/es/components/image-viewer/style/css',
                'element-plus/es/components/empty/style/css',
                'element-plus/es/components/segmented/style/css',
                'element-plus/es/components/calendar/style/css',
                'element-plus/es/components/message/style/css',
                'xlsx',
                'file-saver',
                'element-plus/es/components/timeline/style/css',
                'element-plus/es/components/timeline-item/style/css',
                'vue-img-cutter'
            ]
        },
        plugins: [
            /**
             * vue3.5.0已支持解构并具有响应式
             * */
            vue(),
            vueJsx(), // 开启jsx功能
            UnoCSS(), // 开启UnoCSS
            AutoImport({
                resolvers: [ElementPlusResolver()],
                imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
                dts: 'src/types/auto-imports.d.ts'
            }),
            /** 自动导入组件，但是不会自动导入jsx和tsx */
            Components({
                dirs: ['src/components/**'], // 设置需要扫描的目录
                resolvers: [ElementPlusResolver()],
                dts: 'src/types/components.d.ts'
            }),
            /** 压缩代码 */
            terser({
                format: {
                    comments: false // 移除所有注释
                },
                compress: {
                    drop_console: true, // 移除 console.log
                    drop_debugger: true // 移除 debugger
                }
            })
        ],
        build: {
            cssCodeSplit: true, // 启用 CSS 代码拆分
            minify: 'terser', // 指定使用哪种混淆器
            // chunk 大小警告的限制(kb)
            chunkSizeWarningLimit: 1200,
            // 分包配置
            rollupOptions: {
                output: {
                    chunkFileNames: 'static/js/[name]-[hash].js', // 引入文件名的名称
                    entryFileNames: 'static/js/[name]-[hash].js', // 包的入口文件名称
                    assetFileNames: 'static/[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
                    // 最小化拆分包
                    // eslint-disable-next-line consistent-return
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return 'invariable'
                        }
                    }
                }
            }
        },

        // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
        //
        // 1. prevent vite from obscuring rust errors
        clearScreen: false,
        // 2. tauri expects a fixed port, fail if that port is not available
        server: {
            // 配置跨域
            proxy: {
                '/api': {
                    // “/api” 以及前置字符串会被替换为真正域名
                    target: config.VITE_SERVICE_URL, // 请求域名
                    changeOrigin: true, // 是否跨域
                    rewrite: (p) => p.replace(/^\/api/, '')
                }
            },
            hmr: true, // 热更新
            cors: true, // 配置 CORS
            host: '0.0.0.0',
            port: 1420,
            strictPort: true,
            watch: {
                // 3. tell vite to ignore watching `src-tauri`
                ignored: ['**/src-tauri/**']
            }
        }
    }
})
