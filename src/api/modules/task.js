import httpReq from '@/utils/request'

// 獲取任務類型清單
export const getTaskType = async () => {
  try {
    const res = await httpReq.get('/api/taskType')
    return res
  } catch (error) {
    console.error('獲取任務類型清單失敗:', error)
    throw error
  }
}

// 新增任務類型
export const addTaskType = async () => {
  try {
    const res = await httpReq.post('/api/addTaskType')
    return res
  } catch (error) {
    console.error('新增任務類型失敗:', error)
    throw error
  }
}

// 刪除任務類型
export const deleteTaskType = async () => {
  try {
    const res = await httpReq.post('/api/deleteTaskType')
    return res
  } catch (error) {
    console.error('刪除任務類型失敗:', error)
    throw error
  }
}

// 獲取任務清單
export const getTaskList = async () => {
  try {
    const res = await httpReq.get('/api/taskList')
    return res
  } catch (error) {
    console.error('獲取任務清單失敗:', error)
    throw error
  }
}

// 新增任務
export const addTask = async () => {
  try {
    const res = await httpReq.post('/api/addTask')
    return res
  } catch (error) {
    console.error('獲取任務清單失敗:', error)
    throw error
  }
}

// 刪除任務
export const deleteTask = async () => {
  try {
    const res = await httpReq.post('/api/deleteTask')
    return res
  } catch (error) {
    console.error('獲取任務清單失敗:', error)
    throw error
  }
}