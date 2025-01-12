import { createI18n } from 'vue-i18n'
import en from '@/config/locales/lang/en.js'
import zh from '@/config/locales/lang/zh.js'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'

import zhCn from 'element-plus/es/locale/lang/zh-cn'
import enUs from 'element-plus/es/locale/lang/en'

const messages = {
  en, // 英文語言包
  zh, // 中文語言包
}

const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  messages,
})

const setDayJsLocale = (lang) => {
  dayjs.locale(lang === 'zh' ? 'zh-cn' : 'en')
}

const getElementPlusLocale = (lang) => {
  return lang === 'zh' ? zhCn : enUs
}

export const switchLanguage = (lang) => {
  i18n.global.locale.value = lang
  setDayJsLocale(lang)
  localStorage.setItem('language', lang)
}

const initializeLanguage = () => {
  const savedLanguage = localStorage.getItem('language') || 'zh'
  switchLanguage(savedLanguage)
}

initializeLanguage()

export const getCurrentElementPlusLocale = () => {
  return getElementPlusLocale(i18n.global.locale.value)
}

export default {
  install(app) {
    app.use(i18n)
    app.config.globalProperties.$t = i18n.global.t
    app.config.globalProperties.$switchLanguage = switchLanguage
  },
}
