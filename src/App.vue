<template>
  <el-config-provider :locale="localeConfig">
    <router-view v-slot="{ Component }">
      <transition
        name="fade"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </el-config-provider>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

// 語系映射表
const elementPlusLocales = {
  zh: zhCn,
  en: en,
}

// 獲取 i18n 的 locale
const { locale } = useI18n()

// 映射 i18n 的語言到 Element Plus 的語系物件
const localeConfig = computed(() => elementPlusLocales[locale.value] || zhCn)
</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0
}
</style>
