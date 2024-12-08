import httpReq from "@/utils/request"

// 獲取用戶信息
export const getUsers = async () => {
  try {
    const res = await httpReq.get("/api/users")
    return res
  } catch (error) {
    console.error("獲取用戶信息失敗:", error)
    throw error
  }
}

// 用戶登入
export const login = async (data) => {
  try {
    const res = await httpReq.post("/api/login", data)
    return res
  } catch (error) {
    console.error("用戶登入失敗:", error)
    throw error
  }
}

// 驗證 Token
export const verifyToken = async (token) => {
  try {
    // 模擬發送請求至 /api/verify-token
    const res = await httpReq.post("/api/verifyToken", { token })
    return res
  } catch (error) {
    console.error("驗證 Token 失敗:", error)
    throw error
  }
}
