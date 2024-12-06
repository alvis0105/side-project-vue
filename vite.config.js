import { fileURLToPath, URL } from 'node:url'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import { vitePluginFakeServer } from 'vite-plugin-fake-server'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import vue from '@vitejs/plugin-vue'
import tailwindScrollbar from 'tailwind-scrollbar'

export default defineConfig({
  plugins: [
    vue(),
    vitePluginFakeServer({
      enable: true,
      include: 'mock',
      infixName: false,
      logger: false,
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    tailwindScrollbar(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
