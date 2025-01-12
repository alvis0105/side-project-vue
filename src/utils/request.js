import axios from 'axios'

axios.defaults.baseURL = ''
axios.defaults.timeout = 5000  // 設定超時時間

axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error)
)

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API 請求錯誤：', error.message)
    return Promise.reject(error)
  }
)

const httpReq = {
  /** GET 請求 */
  async get(url, params = {}, config = {}) {
    return axios.get(url, { params, ...config }).then((res) => res.data)
  },

  /** POST 請求 */
  async post(url, data = {}, config = {}) {
    return axios.post(url, data, config).then((res) => res.data)
  },

  /** PUT 請求 */
  async put(url, data = {}, config = {}) {
    return axios.put(url, data, config).then((res) => res.data)
  },

  /** DELETE 請求 */
  async delete(url, data = {}, config = {}) {
    return axios.delete(url, { data, ...config }).then((res) => res.data)
  }
}

export default httpReq
