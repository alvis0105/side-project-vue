<template>
<div class="flex w-full h-full">
  <div class="w-[750px] bg-neutral-90">
  </div>
  <div class="flex items-center justify-center flex-1 w-full h-full p-5">
    <ul class="w-3/4 p-5 space-y-4 h-full-5">
      <li class="flex items-center justify-start w-full font-bold text-font32">
        <span class="py-5">
          帳號登入
        </span>
      </li>
      <li>
        <div>帳號</div>
        <input
          type="text"
          class="w-full p-1 border rounded-xl"
          placeholder="account"
          :disabled="isLoading"
        />
      </li>
      <li>
        <div>密碼</div>
        <input
          type="text"
          class="w-full p-1 border rounded-xl"
          placeholder="password"
          :disabled="isLoading"
        />
      </li>
      <li>
        <button 
          @click="login" class="w-full p-2 mt-5 text-white bg-blue-500 border border-0 rounded-xl"
          :class="isLoading ? 'bg-blue-500 opacity-50' : 'hover:bg-blue-500 hover:opacity-80'"
          :disabled="isLoading"
        >
          登入
        </button>
      </li>
      <li class="relative flex justify-center mt-5">
        <div 
          :class="isLoading ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-90 invisible'"
          class="absolute flex items-center justify-center w-full pt-3 transition-opacity duration-300"
        >
          <Spinner :type="spinnerType" />
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import Spinner from '@/components/BaseSpinner.vue'

// 使用 route 的 meta 設置頁面的標題
// document.title = route.meta.title

const router = useRouter()
const route = useRoute()
const userStore = useUserStore() // 獲取 userStore 實例

const spinnerType = ref('horizontal')
const isLoading = ref(false)

// 登入按鈕的點擊事件
const login = () => {
  isLoading.value = true
  // 模擬登入，根據需求傳入用戶的詳細資料
  const userInfo = { name: 'Alice', token: '123456' }
  userStore.login(userInfo) // 調用 userStore 的 login 方法
  setTimeout(() => {
    // 完成登入後重定向到首頁（或其他頁面）
    router.push("/home")
    isLoading.value = false
  }, 2000)
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
