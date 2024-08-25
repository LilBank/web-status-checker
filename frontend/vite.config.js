import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  base: "/",
  plugins: [react(), svgr()],
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    proxy: {
      "/api/check-urls": {
        target: process.env.VITE_BACKEND_BASE_URL,
        changeOrigin: true,
        secure: false,
      }
    },
  },
  define: {
    'process.env': {
      VITE_API_BASE_URL: process.env.VITE_BACKEND_BASE_URL,
    },
  }
})
