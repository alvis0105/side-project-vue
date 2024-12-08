import { faker } from "@faker-js/faker"
import { users as mockUsers } from "../model/user" // 引用 mockUsers

export default [
  {
    // 隨機取得帳號資訊
    url: "/api/users",
    method: "get",
    response: () => {
      return {
        code: 200,
        status: "success",
        data: Array.from({ length: 10 }).map(() => ({
          id: faker.string.uuid(),
          name: faker.person.firstName() + " " + faker.person.lastName(),
          email: faker.internet.email(),
        })),
      }
    },
  },
  {
    // 登入帳號
    url: "/api/login",
    method: "post",
    response: (request) => {
      const { account, password } = request.body
      const user = mockUsers.find((u) => u.account === account && u.password === password)

      if (user) {
        return {
          code: 200,
          status: "success",
          message: "登入成功",
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
          status: "Unauthorized",
          message: "請輸入有效的帳號及密碼",
        }
      }
    },
  },
  {
    // 驗證 Token
    url: "/api/verify-token",
    method: "post",
    response: (request) => {
      const { token } = request.body
      const user = mockUsers.find((u) => u.token === token)

      if (user) {
        return {
          code: 200,
          status: "success",
          message: "Token 驗證成功",
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
          status: "error",
          message: "無效的 Token",
        }
      }
    },
  },
]
