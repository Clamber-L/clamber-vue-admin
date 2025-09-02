import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from '@unocss/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        UnoCSS()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@/components': path.resolve(__dirname, 'src/components'),
            '@/utils': path.resolve(__dirname, 'src/utils'),
            '@/stores': path.resolve(__dirname, 'src/stores'),
            '@/types': path.resolve(__dirname, 'src/types'),
            '@/api': path.resolve(__dirname, 'src/api'),
            '@/assets': path.resolve(__dirname, 'src/assets'),
            '@/hooks': path.resolve(__dirname, 'src/hooks'),
            '@/pages': path.resolve(__dirname, 'src/pages'),
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/assets/styles/variables.scss";`
            }
        }
    },
    server: {
        port: 1420,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    build: {
        rollupOptions: {
            output: {
                chunkFileNames: 'static/js/[name]-[hash].js',
                entryFileNames: 'static/js/[name]-[hash].js',
                assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor'
                    }
                }
            }
        }
    }
})