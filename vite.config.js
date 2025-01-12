import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { vitePluginFakeServer } from 'vite-plugin-fake-server'
import vue from '@vitejs/plugin-vue'
import tailwindScrollbar from 'tailwind-scrollbar'
import sass from 'sass'

export default defineConfig({
  plugins: [
    vue(),
    vitePluginFakeServer({
      enable: true,
      include: 'mock',
      infixName: false,
      logger: false,
    }),
    tailwindScrollbar(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
        api: 'modern', // 明確使用 Modern API
      },
    },
  },
})
