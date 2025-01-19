import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { vitePluginFakeServer } from 'vite-plugin-fake-server'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers' // Element Plus 解析器
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite' // 自動引入插件
import Components from 'unplugin-vue-components/vite' // 按需引入插件
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
    AutoImport({
      imports: ['vue', 'vue-router'], // 自動引入 Vue API 和 Vue Router API
      resolvers: [ElementPlusResolver()], // 自動引入 Element Plus 的 API
      eslintrc: {
        enabled: true,
      },
      dts: false, // 禁用類型聲明檔案（根據需求可啟用）
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'css', // 按需引入樣式
        }),
      ],
      dts: false, // 禁用類型聲明檔案
    }),
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
