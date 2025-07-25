import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../api/dist',
    emptyOutDir: true
  },
  server: {
    proxy: {
      '/car': 'http://localhost:5000'
    }
  },
 
})
