import httpReq from '@/utils/request'

// 撈取任務類型清單
export const getTaskType = async () => {
  const url = '/api/taskType'
  return await httpReq.get(url)
}

// 新增任務類型
export const addTaskType = async (data) => {
  const url = '/api/addTaskType'
  return await httpReq.post(url, data)
}

// 修改任務類型
export const updateTaskType = async (id, data) => {
  const url = `/api/updateTaskType/${id}`
  return await httpReq.put(url, data)
}

// 刪除任務類型
export const deleteTaskType = async (id) => {
  const url = `/api/deleteTaskType/${id}`
  return await httpReq.delete(url, { id })
}

// 撈取任務清單
export const getTaskList = async () => {
  const url = '/api/taskList'
  return await httpReq.get(url)
}

// 新增任務
export const addTask = async (data) => {
  const url = '/api/addTask'
  return await httpReq.post(url, data)
}

// 修改任務類型
export const updateTask = async (id, data) => {
  const url = `/api/updateTask/${id}`
  return await httpReq.put(url, data)
}

// 刪除任務
export const deleteTask = async (id) => {
  const url = `/api/deleteTask/${id}`
  return await httpReq.delete(url, { id })
}

// 刪除任務細項
export const deleteSubTask = async (taskId, subTaskId) => {
  const url = `/api/deleteSubTask/${taskId}/${subTaskId}`
  return await httpReq.delete(url)
}


// 批次刪除任務
export const deleteSelectedTasks = async (ids) => {
  const url = `/api/deleteSelectedTasks/${ids.join(',')}`
  return await httpReq.delete(url)
}



