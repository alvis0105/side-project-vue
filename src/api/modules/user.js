import httpReq from '@/utils/request'

// 撈取使用者資訊
export const getUsers = async () => {
  const url = '/api/users'
  return await httpReq.get(url)
}

// 新增使用者資訊
export const addUser = async (newTask) => {
  const url = '/api/addUser'
  return await httpReq.post(url, newTask)
}

// 修改使用者資訊
export const updateUser = async (id, data) => {
  const url = `/api/updateUser/${id}`
  return await httpReq.put(url, data)
}

// 刪除使用者資訊
export const deleteUser = async (id) => {
  const url = `/api/deleteUser/${id}`
  return await httpReq.delete(url, { id })
}

// 對應 faker.js 隨機產生 10 筆使用者資訊
export const getRandomUsers = async () => {
  const url = '/api/randomUsers'
  return await httpReq.get(url)
}

// 使用者登入
export const login = async (data) => {
  const url = '/api/login'
  return await httpReq.post(url, data)
}

// 驗證 Token
export const verifyToken = async (token) => {
  const url = '/api/verifyToken'
  return await httpReq.post(url, { token })
}
