<template>
  <div class="relative flex w-full h-full bg-white">
    <!-- 左側背景圖片 -->
    <div class="w-3/4 h-full p-5 overflow-hidden">
      <img
        src="@/assets/image/login.png"
        alt="Login_background"
        class="object-cover w-full h-full p-3 rounded-3xl"
        draggable="false"
      >
    </div>

    <!-- 語言切換按鈕 -->
    <div class="absolute flex space-x-2 top-8 right-6">
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

    <!-- 右側登入表單 -->
    <div class="flex flex-col items-center justify-center w-1/2 h-full p-5">
      <ul class="w-1/2 space-y-4">
        <li class="flex items-center justify-start w-full font-bold text-font32">
          <span class="py-5">{{ $t('message.login') }}</span>
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
            <input
              v-model="userInfo.account"
              type="text"
              :placeholder="$t('message.accountPlaceholder')"
              class="w-full px-12 py-2 border rounded-3xl"
              :class="isLoading ? 'bg-blue-500 bg-opacity-10' : ''"
              :disabled="isLoading"
              @blur="blurHandler()"
            >
          </div>
          <FormAlert
            v-if="!firstEntry && !userInfo.account"
            :message="$t('common.requiredField')"
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
            <input
              v-model="userInfo.password"
              :placeholder="$t('message.passwordPlaceholder')"
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
            :message="$t('common.requiredField')"
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
              {{ isLoading ? $t('message.loading') : $t('message.login') }}
            </div>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/modules/user'
import { switchLanguage } from '@/plugins/i18n.js'
import Spinner from '@/components/BaseSpinner.vue'
import FormAlert from '@/components/BaseFormAlert.vue'

const router = useRouter()
const userStore = useUserStore()
const { locale } = useI18n()

// 狀態管理
const spinnerType = ref('white')
const isLoading = ref(false)
const isVisible = ref(false)
const firstEntry = ref(true)
const userInfo = ref({
  account: 'testUser@gmail.com',
  password: 'abcd1234',
})

// 延遲一秒
const delay = () => {
  return new Promise((resolve) => setTimeout(resolve, 1000))
}

// 登入方法
const login = () => {
  isLoading.value = true
  userStore
    .login(userInfo.value)
    .then(async () => {
      // 模擬延遲以顯示 Spinner
      await delay()
      router.push('/home')
      isLoading.value = false

    })
    .catch((error) => {
      console.error('登入失敗：', error.message || error)
      alert(error.message || '登入失敗，請檢查帳號密碼')
    })
    .finally(() => {
      isLoading.value = false
    })
}

// 顯示密碼切換
const visibleHandler = () => {
  isVisible.value = !isVisible.value
}

// 輸入框失去焦點
const blurHandler = () => {
  firstEntry.value = false
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
