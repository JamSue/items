import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host:'0.0.0.0' // 允许 Vite 在局域网内使用本机 IP 地址访问
  }
})
  