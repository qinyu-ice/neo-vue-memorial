import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  }, server: {
    host: '0.0.0.0',
    // public: '0.0.0.0:5173', // 本地的ip:端口号
    port: 5173,
    open: true,
    proxy: {
      '/api/req/user': {
        // 前缀替换成代理地址： 5173 -> 8080 后端tomcat服务器端口号
        // target: 'http://192.168.16.211:8101',
        target: 'http://localhost:8101',
        ws: false,
        secure: false,
        changeOrigin: true,
        // /api去掉，变成空串，因为它只是一个标识而已，并不是路径
        rewrite: (path) => path.replace(/^\/api\/req\/user/, '/api/user')
      },
      '/api/req/martyr': {
        // 前缀替换成代理地址： 5173 -> 8080 后端tomcat服务器端口号
        // target: 'http://192.168.16.211:8201',
        target: 'http://localhost:8201',
        ws: false,
        secure: false,
        changeOrigin: true,
        // /api去掉，变成空串，因为它只是一个标识而已，并不是路径
        rewrite: (path) => path.replace(/^\/api\/req\/martyr/, '/api/martyr')
      },
      '/api/req/record': {
        // 前缀替换成代理地址： 5173 -> 8080 后端tomcat服务器端口号
        // target: 'http://192.168.16.211:8301',
        target: 'http://localhost:8301',
        ws: false,
        secure: false,
        changeOrigin: true,
        // /api去掉，变成空串，因为它只是一个标识而已，并不是路径
        rewrite: (path) => path.replace(/^\/api\/req\/record/, '/api/record')
      },
      '/api/req/place': {
        // 前缀替换成代理地址： 5173 -> 8080 后端tomcat服务器端口号
        // target: 'http://192.168.16.211:8401',
        target: 'http://localhost:8401',
        ws: false,
        secure: false,
        changeOrigin: true,
        // /api去掉，变成空串，因为它只是一个标识而已，并不是路径
        rewrite: (path) => path.replace(/^\/api\/req\/place/, '/api/place')
      },
      '/api/req/story': {
        // 前缀替换成代理地址： 5173 -> 8080 后端tomcat服务器端口号
        // target: 'http://192.168.16.211:8601',
        target: 'http://localhost:8601',
        ws: false,
        secure: false,
        changeOrigin: true,
        // /api去掉，变成空串，因为它只是一个标识而已，并不是路径
        rewrite: (path) => path.replace(/^\/api\/req\/story/, '/api/story')
      }
    }
  }
})
