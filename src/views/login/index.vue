<template>
  <div class="flex w-full h-full bg-white">
    <div class="w-3/4 h-full p-5 overflow-hidden">
      <!-- <img src="@/assets/image/login.png" alt="Login_background" class="object-cover w-full h-full p-3 rounded-4xl"> -->
      <img
        src="@/assets/image/login.png"
        alt="Login_background"
        class="object-cover w-full h-full p-3 rounded-4xl"
        draggable="false"
      >
    </div>
    <div class="flex items-center justify-center w-1/2 h-full p-5">
      <ul class="w-1/2 space-y-4 h-full-5 me-4">
        <li class="flex items-center justify-start w-full font-bold text-font32">
          <span class="py-5">
            帳號登入
          </span>
        </li>
        <li>
          <div class="relative w-full">
            <span
              class="absolute cursor-pointer left-4 top-1/4"
              @click="visibleHandler"
            >
              <el-icon :size="20">
                <Message />
              </el-icon>
            </span>
            <!-- <div>帳號</div> -->
            <input
              v-model="userInfo.account"
              type="text"
              placeholder="account"
              class="w-full px-12 py-2 border rounded-3xl"
              :class="isLoading ? 'bg-blue-500 bg-opacity-10' : ''"
              :disabled="isLoading"
              @blur="blurHandler()"
            >
          </div>
          <FormAlert
            v-if="!firstEntry && !userInfo.account"
            class="mt-2 ms-2"
          />
        </li>
        <li>
          <div class="relative w-full">
            <span
              class="absolute cursor-pointer left-4 top-1/4"
              @click="visibleHandler"
            >
              <el-icon :size="20">
                <Lock />
              </el-icon>
            </span>
            <!-- <div>密碼</div> -->
            <input
              v-model="userInfo.password"
              placeholder="password"
              class="w-full px-12 py-2 pr-10 border rounded-3xl"
              :class="isLoading ? 'bg-blue-500 bg-opacity-10' : ''"
              :type="isVisible ? 'text' : 'password'"
              :disabled="isLoading"
              @blur="blurHandler()"
            >
            <span
              class="absolute cursor-pointer right-4 top-1/4"
              @click="visibleHandler"
            >
              <el-icon :size="20">
                <component :is="isVisible ? 'Hide' : 'View'" />
              </el-icon>
            </span>
          </div>
          <FormAlert
            v-if="!firstEntry && !userInfo.password"
            class="mt-2 ms-2"
          />
        </li>
        <li>
          <button
            class="flex justify-center w-full p-3 mt-3 font-bold text-white bg-blue-500 border border-0 saturate-150 rounded-3xl"
            :class="isLoading ? 'bg-blue-500 opacity-50' : 'hover:bg-blue-500 hover:opacity-70'"
            :disabled="isLoading"
            @click="login"
          >
            <Spinner
              v-if="isLoading"
              :type="spinnerType"
            />
            <div
              class="flex items-center font-bold text-font20"
              :class="isLoading ? 'ps-3' : ''"
            >
              {{ isLoading ? '登入中' : '登入' }}
            </div>
          </button>
        </li>
        <!-- <li class="relative flex justify-center mt-5">
          <div
            :class="isLoading ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-90 invisible'"
            class="absolute flex items-center justify-center w-full pt-3 transition-opacity duration-300"
          >
            <Spinner :type="spinnerType" />
            <div class="flex items-center font-bold ps-3 text-font20">
              登入中
            </div>
          </div>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import Spinner from '@/components/BaseSpinner.vue'
import FormAlert from '@/components/BaseFormAlert.vue'
import httpReq from '@/utils/request'
import { getUsers } from '@/api'

// 使用 route 的 meta 設置頁面的標題
// document.title = route.meta.title

const router = useRouter()
const userStore = useUserStore() // 獲取 userStore 實例

const spinnerType = ref('white')
const isLoading = ref(false)
const isVisible = ref(false)
const firstEntry = ref(true)
const userInfo = ref({
  account: 'testUser@gmail.com',
  password: 'abcd1234'
})

// 延遲一秒
const delay = () => {
  return new Promise((resolve) => setTimeout(resolve, 1000))
}

const login = () => {
  isLoading.value = true
  userStore
    .login(userInfo.value)
    .then(async () => {
      // 讓登入的spinner能顯示一秒
      await delay()
      router.push("/home")
      isLoading.value = false
    })
    .catch((error) => {
      console.error("登入失敗：", error.message || error)
      alert(error.message || "登入失敗，請檢查帳號密碼")
    })
    .finally(() => {
      isLoading.value = false
    })
}

const visibleHandler = () => {
  isVisible.value = !isVisible.value
}

const blurHandler = () => {
  firstEntry.value = false
}

// const loadUsers = async () => {
//   try {
//     const res = await getUsers()
//     if (res.status === 'success' && res.code === 200) {
//       userInfo.value.name = res.responseData[0].name
//       userInfo.value.account = res.responseData[0].email
//       userInfo.value.password = 'abcde123456'
//     }
//     console.log('取得隨機用戶資料:', res.responseData)
//   } catch (error) {
//     console.error('獲取用戶數據失敗:', error)
//   }
// }

onMounted(() => {
  // loadUsers()
})

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
