import { join } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: join(__dirname, './src/'),
  resolve: {
    alias: {
      '@/': join(__dirname, './src/'),
      './runtimeConfig': './runtimeConfig.browser',
    },
  },
  build: {
    outDir: join(__dirname, './build/'),
  },
  server: {
    port: 3000,
  },
})
