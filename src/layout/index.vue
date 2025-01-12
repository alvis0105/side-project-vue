<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
    <header class="z-10 flex items-center justify-between w-full p-5 bg-white shadow">
      <h1 class="text-font24">
        {{ title }}
      </h1>
      <!-- 語言切換按鈕 -->
      <div class="flex space-x-2">
        <button
          class="font-bold text-blue-500 hover:text-blue-300"
          @click="switchLanguage('zh')"
        >
          中文
        </button>
        <button
          class="font-bold text-red-500 hover:text-red-300"
          @click="switchLanguage('en')"
        >
          EN
        </button>
      </div>
    </header>
    <section class="flex w-full overflow-hidden">
      <!-- 側邊欄 -->
      <div class="flex flex-col w-[250px] h-[calc(100vh-64px)] fixed top-[64px] bg-gray-50 border-r">
        <!-- 菜單 -->
        <el-menu
          router
          class="flex-grow overflow-y-auto scrollbar"
        >
          <NavMenu :nav-menus="translatedMenuList" />
        </el-menu>
        <!-- 登出按鈕 -->
        <div
          class="flex items-center justify-center border-t el-menu-item"
          @click="logout"
        >
          <el-icon><SwitchButton /></el-icon>
          <button>
            {{ $t('message.logout') }}
          </button>
        </div>
      </div>
      <!-- 主內容區域 -->
      <div class="ml-[250px] flex-grow h-full p-5 mb-5 overflow-auto">
        <!-- 頁面標題 -->
        <Header class="p-2" />
        <!-- 頁面內容 -->
        <div class="w-full p-2 pt-4">
          <router-view />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { SwitchButton } from '@element-plus/icons-vue'
import { computed, onMounted } from 'vue'
import { menuList } from '/mock/model/menu'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import { useI18n } from 'vue-i18n'
import { switchLanguage } from '@/plugins/i18n.js'
import NavMenu from './components/NavMenu.vue'
import Header from './components/Header.vue'
import config from '@/config'

// 初始化 store 和路由
const userStore = useUserStore()
const router = useRouter()

// 使用 i18n
const { locale, t } = useI18n()

const title = computed(() => {
  const translatedTitle = t('config.title')
  // 檢查翻譯結果是否有效，否則回退到環境變數
  return translatedTitle && translatedTitle !== 'config.title'
    ? translatedTitle
    : config.TITLE
})

// 翻譯 menuList 中的標題
const translatedMenuList = computed(() => {
  return menuList.map((item) => ({
    ...item,
    meta: {
      ...item.meta,
      title: t(item.meta.i18nTitle || item.meta.title), // 使用 i18nTitle 作為 key 翻譯
    },
    children: item.children
      ? item.children.map((child) => ({
          ...child,
          meta: {
            ...child.meta,
            title: t(child.meta.i18nTitle || child.meta.title), // 同樣處理子項目
          },
        }))
      : [],
  }))
})

// 登出功能
const logout = () => {
  userStore.logout()
  router.push('/login')
}

// 初始化語言設置
const initializeLanguage = () => {
  const savedLanguage = localStorage.getItem('language')
  if (savedLanguage) {
    locale.value = savedLanguage
  }
}

onMounted(() => {
  initializeLanguage()
})

</script>
