import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
  },
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://chmm-college.onrender.com',
        changeOrigin: true,
        headers: {
          origin: 'https://chmm-college-frontend.onrender.com',
        },
      }
    } 
  }
})
