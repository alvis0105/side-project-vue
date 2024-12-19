import axios from 'axios'

axios.defaults.baseURL = ''
axios.defaults.timeout = 5000  // 設定超時時間

// 簡化的攔截器，只在請求時加上必要的 header
axios.interceptors.request.use(
  (config) => {
    // 如果需要，也可以加一些全局 header，例如
    // config.headers['X-Custom-Header'] = 'CustomValue'
    return config
  },
  (error) => Promise.reject(error)
)

// 簡化的錯誤處理
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API 請求錯誤：', error.message)
    return Promise.reject(error)
  }
)

const httpReq = {
  /** 自定義 GET 請求 */
  async get(url, params = {}, config = {}) {
    return axios.get(url, { params, ...config }).then((res) => res.data)
  },

  /** 自定義 POST 請求 */
  async post(url, data = {}, config = {}) {
    return axios.post(url, data, config).then((res) => res.data)
  },

  /** 自定義 PUT 請求 */
  async put(url, data = {}, config = {}) {
    return axios.put(url, data, config).then((res) => res.data)
  },

  /** 自定義 DELETE 請求 */
  async delete(url, data = {}, config = {}) {
    return axios.delete(url, { data, ...config }).then((res) => res.data)
  }
}

export default httpReq
