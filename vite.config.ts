import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: process.env.GITHUB_ACTIONS === 'true' ? '/CityFit/' : '/',
  plugins: [vue()],
  server: {
    port: 5176,
    strictPort: true,
  },
})
