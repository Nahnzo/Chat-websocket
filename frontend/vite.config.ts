import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      app: path.resolve(__dirname, 'src/app'),
      entities: path.resolve(__dirname, 'src/entities'),
      components: path.resolve(__dirname, 'src/components'),
      pages: path.resolve(__dirname, 'src/pages'),
      features: path.resolve(__dirname, 'src/features'),
      widgets: path.resolve(__dirname, 'src/widgets'),
      shared: path.resolve(__dirname, 'src/shared'),
    },
  },
})
