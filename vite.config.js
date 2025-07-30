import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/orders': {
        target: 'https://web-production-1b3894.up.railway.app',
        changeOrigin: true,
        secure: true,
      },
    },
  },
});