import {
  taskType as initialTaskType,
  taskList as initialTaskList,
} from '../model/task'

// 模擬 localStorage 的行為
const fakeLocalStorage = (() => {
  let store = {}
  return {
    getItem: (key) => (store[key] || null),
    setItem: (key, value) => { store[key] = value.toString() },
    removeItem: (key) => { delete store[key] },
    clear: () => { store = {} },
  }
})()

// 判斷是否使用瀏覽器的 localStorage 或模擬版本
const storage = typeof window !== 'undefined' && localStorage
  ? localStorage
  : fakeLocalStorage

// 通用 JSON 處理方法
const stringifyData = (value) => JSON.stringify(value)
const parseData = (value) => {
  try {
    return JSON.parse(value) || []
  } catch {
    return []
  }
}

// 初始化資料
if (!storage.getItem('taskList')) {
  storage.setItem('taskList', stringifyData(initialTaskList))
}

if (!storage.getItem('taskType')) {
  storage.setItem('taskType', stringifyData(initialTaskType))
}

// 公用函式操作 LocalStorage
const getTaskList = () => parseData(storage.getItem('taskList'))
const setTaskList = (tasks) => storage.setItem('taskList', stringifyData(tasks))

const getTaskType = () => parseData(storage.getItem('taskType'))
const setTaskType = (types) => storage.setItem('taskType', stringifyData(types))

export default [
  {
    // 取得任務類型清單
    url: '/api/taskType',
    method: 'get',
    response: () => ({
      code: 200,
      status: 'success',
      data: getTaskType(),
    }),
  },
  {
    // 新增任務類型
    url: '/api/addTaskType',
    method: 'post',
    response: (request) => {
      const { id, name } = request.body
      if (id && name) {
        const taskType = getTaskType()
        taskType.push({ id, name, createdAt: new Date().toISOString() })
        setTaskType(taskType)
        return {
          code: 200,
          status: 'success',
          message: '任務類型新增成功',
        }
      }
      return {
        code: 400,
        status: 'Bad Request',
        message: '請檢查是否格式錯誤或資料不齊全',
      }
    },
  },
  {
    // 修改任務類型
    url: '/api/updateTaskType/:id',
    method: 'put',
    response: (request) => {
      const { id } = request.params
      const updatedFields = request.body
      const taskType = getTaskType()

      const index = taskType.findIndex((type) => type.id === id)
      if (index === -1) {
        return {
          code: 404,
          status: 'Not Found',
          message: `任務類型 ID ${id} 不存在`,
        }
      }

      taskType[index] = { ...taskType[index], ...updatedFields }
      setTaskType(taskType)

      return {
        code: 200,
        status: 'success',
        message: `任務類型 ID ${id} 修改成功`,
      }
    },
  },
  {
    // 刪除任務類型
    url: '/api/deleteTaskType/:id',
    method: 'delete',
    response: (request) => {
      const { id } = request.params
      const taskType = getTaskType()
      const filteredTaskType = taskType.filter((type) => type.id !== id)

      if (filteredTaskType.length === taskType.length) {
        return {
          code: 404,
          status: 'Not Found',
          message: `任務類型 ID ${id} 不存在`,
        }
      }

      setTaskType(filteredTaskType)

      return {
        code: 200,
        status: 'success',
        message: `任務類型 ID ${id} 刪除成功`,
      }
    },
  },
  {
    // 取得任務清單
    url: '/api/taskList',
    method: 'get',
    response: () => ({
      code: 200,
      status: 'success',
      data: getTaskList(),
    }),
  },
  {
    // 新增任務
    url: '/api/addTask',
    method: 'post',
    response: (request) => {
      const { newTask } = request.body
      if (newTask && newTask.id) {
        const taskList = getTaskList()
        taskList.push(newTask)
        setTaskList(taskList)
        return {
          code: 200,
          status: 'success',
          message: '任務新增成功',
        }
      }
      return {
        code: 400,
        status: 'Bad Request',
        message: '請檢查是否格式錯誤或資料不齊全',
      }
    },
  },
  {
    // 修改任務
    url: '/api/updateTask/:id',
    method: 'put',
    response: (request) => {
      const { id } = request.params
      const updatedFields = request.body

      const taskList = getTaskList()
      const index = taskList.findIndex((task) => task.id === parseInt(id))

      if (index === -1) {
        return {
          code: 404,
          status: 'Not Found',
          message: `任務 ID ${id} 不存在`,
        }
      }

      taskList[index] = { ...taskList[index], ...updatedFields }
      setTaskList(taskList)

      return {
        code: 200,
        status: 'success',
        message: `任務 ID ${id} 修改成功`,
        data: taskList[index],
      }
    },
  },
  {
    // 刪除選中的整筆任務
    url: '/api/deleteTask/:id',
    method: 'delete',
    response: (request) => {
      const { id } = request.params

      const taskList = getTaskList()
      const filteredTaskList = taskList.filter((task) => task.id !== parseInt(id))

      if (filteredTaskList.length === taskList.length) {
        return {
          code: 404,
          status: 'Not Found',
          message: `任務 ID ${id} 不存在`,
        }
      }

      // 重新分配 ID 從 1 開始
      const updatedTaskList = filteredTaskList.map((item, index) => ({
        ...item,
        id: index + 1,
      }))

      // 更新 LocalStorage
      setTaskList(updatedTaskList)

      return {
        code: 200,
        status: 'success',
        message: `任務 ID ${id} 刪除成功`,
      }
    },
  },
  {
    // 刪除任務細項
    url: '/api/deleteSubTask/:taskId/:subTaskId', // 使用路徑參數
    method: 'delete',
    response: (request) => {
      const { taskId, subTaskId } = request.params

      const taskList = getTaskList()
      const task = taskList.find((task) => task.id === parseInt(taskId))

      if (!task) {
        return {
          code: 404,
          status: 'Not Found',
          message: `任務 ID ${taskId} 不存在`,
        }
      }

      const updatedSubTasks = task.subTasks.filter(
        (subTask) => subTask.id !== parseInt(subTaskId),
      )

      if (updatedSubTasks.length === task.subTasks.length) {
        return {
          code: 404,
          status: 'Not Found',
          message: `細項 ID ${subTaskId} 不存在於任務 ID ${taskId}`,
        }
      }

      task.subTasks = updatedSubTasks.map((item, index) => ({
        ...item,
        id: index + 1, // 重新分配細項 ID
      }))

      setTaskList(taskList)

      return {
        code: 200,
        status: 'success',
        message: `任務 ID ${taskId} 的細項 ID ${subTaskId} 刪除成功`,
      }
    },
  },
  {
    // 批次刪除任務
    url: '/api/deleteSelectedTasks/:ids',
    method: 'delete',
    response: (request) => {
      const ids = request.params.ids.split(',') // 直接分割成字串陣列

      if (!ids || !ids.length) {
        return {
          code: 400,
          status: 'Bad Request',
          message: '未提供有效的 ID 陣列',
        }
      }

      const taskList = getTaskList()
      const filteredTaskList = taskList.filter((task) => !ids.includes(String(task.id))) // 比對字串類型的 ID

      if (filteredTaskList.length === taskList.length) {
        return {
          code: 404,
          status: 'Not Found',
          message: '提供的 ID 全部無效',
        }
      }

      // 更新 Task List 並重新分配 ID
      const updatedTaskList = filteredTaskList.map((item, index) => ({
        ...item,
        id: index + 1,
      }))

      setTaskList(updatedTaskList)

      return {
        code: 200,
        status: 'success',
        message: '批次刪除成功',
      }
    },
  },
]
