<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
    <header class="flex items-center justify-start w-full p-5 text-font24">
      <h1>{{ config.TITLE }}</h1>
    </header>
    <section class="flex flex-grow w-full overflow-hidden border">
      <!-- 側邊欄 -->
      <div class="flex flex-col w-[200px] overflow-hidden border-r">
        <el-menu
          router
          class="flex-grow overflow-y-auto scrollbar"
        >
          <NavMenu :nav-menus="menuList" />
        </el-menu>
        <!-- 登出按鈕 -->
        <div class="flex justify-center mt-auto border el-menu-item" @click="logout">
          <el-icon><SwitchButton /></el-icon>
          <button>
            登出
          </button>
        </div>
      </div>
      <!-- 頁面 -->
      <div class="flex-grow h-full p-5 mb-5 overflow-auto">
        <!-- 頁面標題 -->
        <Header class="p-2"/>
        <!-- 頁面內容 -->
        <router-view class="w-full p-2 pt-4" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { SwitchButton } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { menuList } from '/mock/model/menu'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import NavMenu from './components/NavMenu.vue'
import Header from './components/Header.vue'
import config from '@/config'

const userStore = useUserStore() // 獲取 userStore 實例
const router = useRouter()
const route = useRoute()
const layout = ref()

const logout = () => {
  userStore.logout()
  router.push('/login')
}

</script>

