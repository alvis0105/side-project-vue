import { taskType, taskList } from '../model/task'

export default [
  {
    // 取得任務類型清單
    url: '/api/taskType',
    method: 'get',
    response: () => {
      return {
        code: 200,
        status: 'success',
        data: taskType.map((item) => ({
          id: item.id,
          type: item.name,
          createdAt: item.createdAt
        }))
      }
    }
  },
  {
    // 取得任務清單
    url: '/api/taskList',
    method: 'get',
    response: () => {
      return {
        code: 200,
        status: 'success',
        data: taskList,
        // data: taskList.map((item) => ({
        //   id: item.id,
        //   name: item.name,
        //   type: item.taskType,
        //   startDate: item.startDate,
        //   endDate: item.endDate
        // }))
      }
    }
  },
  {
    // 新增任務
    url: '/api/addTask',
    method: 'post',
    response: (request) => {
      const { item } = request.body
      if (item) {
        return {
          code: 200,
          status: 'success',
          message: '任務新增成功',
          data: {
            id: item.id,
            name: item.name,
            type: item.taskType,
            startDate: item.startDate,
            endDate: item.endDate
          }
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
    // 刪除任務
    url: '/api/deleteTask',
    method: 'post',
    response: (request) => {
      const { item } = request.body
      if (item) {
        return {
          code: 200,
          status: 'success',
          message: '任務刪除成功',
          // data: {
          //   id: item.id,
          //   name: item.name,
          //   type: item.taskType,
          //   startDate: item.startDate,
          //   endDate: item.endDate
          // }
        }
      } else {
        return {
          code: 500,
          status: 'error',
          message: '伺服器錯誤，請稍後再試'
        }
      }
    }
  }
]