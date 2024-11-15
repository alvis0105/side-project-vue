import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: false,  // 是否登入
    userInfo: null,          // 用戶資訊
    isMenuLoaded: false,       // 菜單是否已加載
  }),
  actions: {
    // 用戶登入
    login(userInfo) {
      this.isAuthenticated = true
      this.userInfo = userInfo

      // 將登入狀態和用戶 token 儲存至 localStorage，保持登入狀態
      localStorage.setItem('isAuthenticated', 'true')
      if (userInfo.token) {
        localStorage.setItem('token', userInfo.token)
      }
    },
    
    // 用戶登出
    logout() {
      this.isAuthenticated = false
      this.userInfo = null
      this.isMenuLoaded = false

      // 登出時清空 localStorage 中的登入相關資料
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('token')
    },
    
    // 設置菜單已加載
    setMenuLoaded(loaded) {
      this.isMenuLoaded = loaded
    }
  },
  getters: {
    // 返回當下用戶的登入狀態，即使頁面刷新後也能保持
    isUserAuthenticated: (state) => {
      return state.isAuthenticated || localStorage.getItem('isAuthenticated') === 'true'
    },

    // 返回用戶名稱，若未登入則顯示 "Guest"
    userName: (state) => state.userInfo ? state.userInfo.name : 'Guest',
  },
})
