import { defineStore } from "pinia"
import { login, verifyToken } from "@/api" // 引入 API login 方法和模擬 Token 驗證方法

export const useUserStore = defineStore("user", {
  state: () => ({
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true", // 預設從 localStorage 獲取登入狀態
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || null, // 從 localStorage 獲取用戶資訊
    isMenuLoaded: false, // 菜單是否已加載
  }),
  actions: {
    // 用戶登入
    login(loginForm) {
      return new Promise((resolve, reject) => {
        login(loginForm)
          .then((res) => {
            if (res?.data) {
              try {
                // 更新 Store 狀態
                this.isAuthenticated = true
                this.userInfo = res.data

                // 更新 localStorage
                localStorage.setItem("isAuthenticated", "true")
                localStorage.setItem("userInfo", JSON.stringify(res.data))
                if (res.data.token) {
                  localStorage.setItem("token", res.data.token)
                }

                resolve(res) // 返回成功
              } catch (error) {
                reject(error) // 處理狀態或 localStorage 時出錯
              }
            } else {
              reject(new Error(res?.message || "登入失敗"))
            }
          })
          .catch((error) => {
            reject(error) // 捕捉 API 呼叫錯誤
          })
      })
    },

    // 用戶登出
    logout() {
      this.isAuthenticated = false
      this.userInfo = null
      this.isMenuLoaded = false

      // 清空 localStorage 中的登入相關資料
      localStorage.removeItem("isAuthenticated")
      localStorage.removeItem("userInfo")
      localStorage.removeItem("token")
    },

    // 初始化用戶狀態
    initializeUser() {
      const token = localStorage.getItem("token")

      if (token) {
        // 如果有 Token，進行驗證
        verifyToken(token)
          .then((res) => {
            this.isAuthenticated = true
            this.userInfo = res.data // 更新用戶資料
          })
          .catch(() => {
            this.logout() // 無效 Token，自動登出
          })
      } else {
        // 沒有 Token，清空狀態
        this.isAuthenticated = false
        this.userInfo = null
      }
    },

    // 設置菜單已加載
    setMenuLoaded(loaded) {
      this.isMenuLoaded = loaded
    },
  },
  getters: {
    // 返回用戶名稱，若未登入則顯示 "Guest"
    userName: (state) => (state.userInfo ? state.userInfo.name : "Guest"),
  },
})
