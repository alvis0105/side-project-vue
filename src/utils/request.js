import axios from 'axios'

// 如果是開發模式，可以使用 vite-plugin-fake-server 來模擬 API
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

let httpReq = {

  /** get 請求
     * @param  {接口地址} url
     * @param  {請求參數} params
     * @param  {參數} config
     */
  get: function(url, params = {}, config = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: url,
        params: params,
        ...config,
      }).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  /** post 請求
     * @param  {接口地址} url
     * @param  {請求參數} data
     * @param  {參數} config
     */
  post: function(url, data = {}, config = {}) {
    console.table('data:', data)
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: url,
        data: data,
        ...config,
      }).then((response) => {
        console.table('request中post的response:', response)
        resolve(response.data)
      }).catch((error) => {
        console.log('error:', error)
        reject(error)
      })
    })
  },

  /** put 請求
     * @param  {接口地址} url
     * @param  {請求參數} data
     * @param  {參數} config
     */
  put: function(url, data = {}, config = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: url,
        data: data,
        ...config,
      }).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  /** patch 請求
     * @param  {接口地址} url
     * @param  {請求參數} data
     * @param  {參數} config
     */
  patch: function(url, data = {}, config = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'patch',
        url: url,
        data: data,
        ...config,
      }).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  /** delete 請求
     * @param  {接口地址} url
     * @param  {請求參數} data
     * @param  {參數} config
     */
  delete: function(url, data = {}, config = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url: url,
        data: data,
        ...config,
      }).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    })
  },
}

export default httpReq
