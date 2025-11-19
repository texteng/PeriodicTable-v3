import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '',
  build: {
    outDir: 'dist', // Customize the output directory
    sourcemap: false, // Disable source maps in production (optional)
  }
})
