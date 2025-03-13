import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base : "/car-parking/",
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["html2canvas","jspdf"],
    },
  },
})
