<template>
  <div class="flex w-full h-full bg-white">
    <div class="w-3/5 h-full overflow-hidden">
      <img src="@/assets/image/login.png" alt="Login_background" class="w-full h-full">
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
            v-model="userInfo.account"
            type="text"
            class="w-full p-1 placeholder-gray-300 border rounded-xl"
            :class="isLoading ? 'bg-blue-500 bg-opacity-5' : ''"
            placeholder="account"
            :disabled="isLoading"
          >
        </li>
        <li>
          <div>密碼</div>
          <input
            v-model="userInfo.password"
            type="text"
            class="w-full p-1 placeholder-gray-300 border rounded-xl bg-opacity-5"
            :class="isLoading ? 'bg-blue-500 bg-opacity-5' : ''"
            placeholder="password"
            :disabled="isLoading"
          >
        </li>
        <li>
          <button
            class="w-full p-2 mt-5 font-bold text-white bg-blue-500 border border-0 rounded-xl"
            :class="isLoading ? 'bg-blue-500 opacity-50' : 'hover:bg-blue-500 hover:opacity-80'"
            :disabled="isLoading"
            @click="login"
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
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import Spinner from '@/components/BaseSpinner.vue'
import axios from 'axios'

// 使用 route 的 meta 設置頁面的標題
// document.title = route.meta.title

const router = useRouter()
const userStore = useUserStore() // 獲取 userStore 實例

const spinnerType = ref('horizontal')
const isLoading = ref(false)
const userInfo = ref({
  account: 'test@gmail.com',
  password: '123456'
})

// 登入按鈕的點擊事件
const login = () => {
  isLoading.value = true
  // 模擬登入，根據需求傳入用戶的詳細資料
  userStore.login(userInfo.value)
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
