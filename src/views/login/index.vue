<template>
  <div class="about">
    <h1>登入頁面</h1>
    <button @click="login" class="w-20 ml-4 text-white bg-black border border-0 shadow">login</button>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/modules/user' // 引入 userStore 模組

const router = useRouter()
const route = useRoute()
const userStore = useUserStore() // 獲取 userStore 實例

// 使用 route 的 meta 設置頁面的標題
document.title = route.meta.title

// 登入按鈕的點擊事件
const login = () => {
  // 模擬登入，根據需求傳入用戶的詳細資料
  const dummyUserInfo = { name: 'Alice', token: '123456' }
  userStore.login(dummyUserInfo) // 調用 userStore 的 login 方法

  // 完成登入後重定向到首頁（或其他頁面）
  router.replace("/")
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
