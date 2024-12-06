import { faker } from '@faker-js/faker'

export default [
  {
    // 隨機取得帳號資訊
    url: '/api/users',
    method: 'get',
    response: () => {
      return {
        code: 200,
        status: 'success',
        responseData: Array.from({ length: 10 }).map(() => ({
          id: faker.string.uuid(),
          name: faker.person.firstName() + ' ' + faker.person.lastName(),
          email: faker.internet.email(),
        })),
      }
    },
  },
  {
    // 登入帳號
    url: '/api/login',
    method: 'post',
    response: (request) => {
      const { account, password, name } = request.body
      if (account && password) {
        return {
          code: 200,
          status: 'success',
          message: '登入成功',
          token: faker.string.uuid(),
          userInfo: {
            name: name,
            account,
            email: account,
          }
        }
      } else {
        return {
          code: 401,
          status: 'Unauthorized',
          message: '請輸入有效的帳號及密碼'
        }
      }
    }
  },
]
