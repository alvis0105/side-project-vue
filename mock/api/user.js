import { faker } from '@faker-js/faker'
import { users as mockUsers } from '../model/user' // 引用 mockUsers

export default [
  {
    // 隨機取得10筆帳號資訊
    url: '/api/randomUsers',
    method: 'get',
    response: () => {
      return {
        code: 200,
        status: 'success',
        data: Array.from({ length: 10 }).map(() => ({
          id: faker.string.uuid(),
          name: faker.person.firstName() + ' ' + faker.person.lastName(),
          email: faker.internet.email(),
        })),
      }
    },
  },
  {
    // 撈取使用者資訊
    url: '/api/users',
    method: 'get',
    response: () => {
      return {
        code: 200,
        status: 'success',
        data: mockUsers,
      }
    },
  },
  {
    // 登入帳號
    url: '/api/login',
    method: 'post',
    response: (request) => {
      const { account, password } = request.body
      const user = mockUsers.find((u) => u.account === account && u.password === password)

      if (user) {
        return {
          code: 200,
          status: 'success',
          message: '登入成功',
          token: user.token,
          data: {
            id: user.id,
            name: user.name,
            role: user.role,
            account: user.account,
          },
        }
      } else {
        return {
          code: 401,
          status: 'Unauthorized',
          message: '請輸入有效的帳號及密碼',
        }
      }
    },
  },
  {
    // 驗證 Token
    url: '/api/verify-token',
    method: 'post',
    response: (request) => {
      const { token } = request.body
      const user = mockUsers.find((u) => u.token === token)

      if (user) {
        return {
          code: 200,
          status: 'success',
          message: 'Token 驗證成功',
          data: {
            id: user.id,
            name: user.name,
            role: user.role,
            account: user.account,
          },
        }
      } else {
        return {
          code: 403,
          status: 'error',
          message: '無效的 Token',
        }
      }
    },
  },
  {
    // 新增使用者
    url: '/api/addUser',
    method: 'post',
    response: (request) => {
      const { id } = request.body
      if (id) {
        return {
          code: 200,
          status: 'success',
          message: '使用者新增成功',
        }
      } else {
        return {
          code: 400,
          status: 'Bad Request',
          message: '請檢查是否格式錯誤或資料不齊全'
        }
      }
    }
  },
  {
     // 修改使用者
    url: '/api/updateUser/:id',
    method: 'put',
    response: (request) => {
      const { id } = request.params
      const { name, createdAt } = request.body
      if (id) {
        return {
          code: 200,
          status: 'success',
          message: `使用者修改成功`,
          data: {
            id,
            name: name,
            account: account,
            createdAt: createdAt
          }
        }
      } else {
        return {
          code: 400,
          status: 'Bad Request',
          message: '請檢查是否傳入 ID 或 至少一個要修改的欄位'
        }
      }
    }
  },
  {
    // 刪除使用者
    url: '/api/deleteUser/:id',
    method: 'delete',
    response: (request) => {
      const { id } = request.params
      if (id) {
        return {
          code: 200,
          status: 'success',
          message: '使用者刪除成功',
          data: {
            id
          }
        }
      } else {
        return {
          code: 400,
          status: 'Bad Request',
          message: '缺少使用者 ID, 刪除失敗'
        }
      }
    }
  },
]
