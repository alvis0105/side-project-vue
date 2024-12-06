import httpReq from '@/utils/request'

const userApi = {
  // 獲取用戶信息
  getUsers: async() => {
    try {
      const response = await httpReq.get('/api/users')
      return response
    } catch (error) {
      console.error('獲取用戶信息失敗:', error)
      throw error
    }
  },
  
  // 用戶登入
  login: async(data) => {
    try {
      const response = await httpReq.post('/api/login', data)
      return response
    } catch (error) {
      console.error('用戶登入失敗:', error)
      throw error
    }
  }
}

export default userApi
