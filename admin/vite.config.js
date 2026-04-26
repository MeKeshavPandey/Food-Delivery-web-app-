import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'https://food-delivery-web-app-uraa.onrender.com',
        changeOrigin: true
      },
      '/uploads': {
        target: 'https://food-delivery-web-app-uraa.onrender.com',
        changeOrigin: true
      }
    }
  }
})
