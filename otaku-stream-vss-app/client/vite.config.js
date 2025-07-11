import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const PORT = 3000;

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),    
  ],
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${PORT}`, // Your Express backend
        changeOrigin: true,
        secure: false
      },
        '/uploads': {
        target: `http://localhost:${PORT}`, // Your Express backend
        changeOrigin: true,
        secure: false
      }
    }
  }
})
