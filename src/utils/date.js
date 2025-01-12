import dayjs from 'dayjs'

/**
 * 獲取當下時間，並格式化為指定格式
 * @param {string} format 默認格式為 'YYYY-MM-DD HH:mm:ss'
 * @returns {string} 格式化後的時間字串
 */
export const getCurrentDate = () => dayjs().format('YYYY-MM-DD')