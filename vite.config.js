import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"
import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false
        })
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // 开发服务器配置
    port: 5173, // 前端开发服务器端口（默认）
    open: true, // 自动打开浏览器
    proxy: {
      // 代理所有以 /api 开头的请求
      '/api': {
        target: 'http://localhost:8080', // 后端服务器地址
        changeOrigin: true, // 修改请求头中的host为目标URL
        // rewrite: (path) => path.replace(/^\/api/, '') // 移除/api前缀（可选）
      },
      // 可以添加更多代理规则
      '/other-api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  preview: {
    // 预览服务器配置（npm run preview时生效）
    port: 4173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})