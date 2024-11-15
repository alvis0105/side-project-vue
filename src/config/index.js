const DEFAULT_CONFIG = {
  // 標題
  TITLE: import.meta.env.VITE_APP_TITLE,

  // 首頁位址
  HOME_URL: '/home',

  // 版本號
  APP_VER: '1.0.0',

  // 內核版本號
  CORE_VER: '1.0.0',

  // API位址
  // API_URL: import.meta.env.DEV && import.meta.env.VITE_PROXY === 'Y' ? import.meta.env.VITE_PROXY_KEY : import.meta.env.VITE_API_BASEURL,

  // 請求超時
  TIMEOUT: 10000,

  // TokenName
  TOKEN_NAME: 'Authorization',

  // Token前綴，注意最後有個空格，如不需要需設定空字符串
  TOKEN_PREFIX: 'Bearer ',

  // 請求白名單，設定不需要accessToken的API，以防止accessToken過期後再請求造成無限循環
  API_WHITE_LIST: ['/auth/token', '/auth/login'],

  // 路由白名单，如果已經登入並存在登入資訊就不能跳轉到路由白名單
  ROUTE_WHITE_LIST: ['/login', '/reset-password'],

  /**
   * 1.登入頁的免登入儲存幾天，預設3天，若於登入時有勾選“免登入”在LOGOIN_DAY期間內關閉瀏覽器重開會自動登入
   * 2.前端由expires判斷是否可提交refresh token請求，expires存在且大於0並已逾期才可提交refresh token請求
   * 3.若可提交refresh token請求，在瀏覽器工作階段及有勾選“免登入”於LOGOIN_DAY期間內關閉瀏覽器重開的情況下accessToken失效則提交refresh token請求刷新token
   * 4.若不可提交refresh token請求，在瀏覽器工作階段accessToken失效則必須重新登入，refresh token請求返回fail同樣必須重新登入
   * 5.每次刷新token都會取得一組新的accessToken, expires及refreshToken，refreshToken爲HttpOnly Cookie前端無法讀取
   * 6.若有refresh token機制，LOGOIN_DAY理論上應大於accessToken有效期(expires)並小於refreshToken有效期(refreshToken由後端處理)
   * 7.不需要“免登入”功能或沒有refresh token機制請將LOGOIN_DAY設爲0
   */
  LOGOIN_DAY: 3,

  // 追加其他header
  HEADERS: {},

  // 請求是否開啟緩存
  REQUEST_CACHE: false,

  // 佈局 預設：default | 通欄：header | 經典：menu | 功能塢：dock
  // dock將關閉標籤和麵包屑欄
  LAYOUT: 'menu',

  // 選單是否折疊
  MENU_IS_COLLAPSE: false,

  // 選單是否啟用手風琴效果
  MENU_UNIQUE_OPENED: false,

  // 是否使用動態選單
  MENU_USE_DYNMIC: true,

  // 是否在本地快取動態選單(預設不啟用以便development mode測試，production mode建議啟用減少資源消耗，變更設定後要清除快取才會生效)
  MENU_USE_CACHE: false,

  // 是否開啟多標籤
  LAYOUT_TAGS: true,

  // UserBar功能啓用設定
  // screen:最大化 | darkness:黑夜模式 | language:語系 | tasks:任務中心 | msg:訊息中心 | name:使用者名稱
  LAYOUT_USERBAR: {
    screen: true,
    darkness: true,
    language: true,
    tasks: true,
    msg: true,
    name: false,
  },

  // 是否提供設定面板
  // 設定面板是提供給開發者預覽Layout設定效果，面板中的項目均可在此設定預設值，非常不建議在生產環境下開放佈局設定
  SETTINGS_PANEL: false,

  // 是否以瀏覽器語系自動判斷語言，無法判斷或語言包不存在才使用 LANG 設定
  LANG_AUTO: true,

  // 語言
  LANG: 'zh-TW',

  // 主題顏色
  COLOR: '',

  // 預設是否啓用暗色主題
  DARK: false,

  // 環境變數設定 storage 的命名空間，做為系統參數儲存 storage 時 key 的前綴，可依專案設定不同命名空間
  LS_NAMESPACE: import.meta.env.VITE_LS_NAMESPACE || '',

  // 是否加密localStorage, 為空不加密，可填寫AES(模式ECB,移位Pkcs7)加密
  LS_ENCRYPTION: '',

  // localStorage AES加密秘鑰，位數建議填寫8的倍數
  LS_ENCRYPTION_KEY: '2XNN4K8LC0ELVWN4',

  // 控制台首頁預設佈局
  DEFAULT_GRID: {
    // 預設分欄數量和寬度 例如 [24] [18,6] [8,8,8] [6,12,6]
    layout: [12, 6, 6],
    // 小組件分佈，com取值:views/home/components 文件名
    compsList: [
      ['WelcomeWidget'],
      ['AboutWidget', 'VerWidget'],
      ['TimeWidget', 'ProgressWidget'],
    ],
  },
}

// 如果生產模式，就合併動態的APP_CONFIG
// public/config.js
if (import.meta.env.PROD) {
  Object.assign(DEFAULT_CONFIG, APP_CONFIG)
}

export default DEFAULT_CONFIG
