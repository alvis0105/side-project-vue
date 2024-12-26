import zh from 'element-plus/es/locale/lang/zh-cn';

export default {
  el: zh, // Element Plus 中文語言包
  config: {
    title: '多功能展示平台'
  },
  message: {
    login: '登入',
    logout: '登出',
    accountPlaceholder: '請輸入帳號',
    passwordPlaceholder: '請輸入密碼',
    loading: '登入中...',
    welcome: '歡迎使用多功能展示平台',
  },
  description: {
    title: '功能描述:',
  },
  menu: {
    home: '首頁',
    tasks: {
      title: '任務管理',
      taskList: {
        title: '任務列表',
        taskName: '任務名稱',
        taskType: '任務類型',
        subTaskName: '細項名稱',
        detail: '細項內容',
        startDate: '起始日期',
        endDate: '結束日期',
      },
    },
    dashboard: {
      title: '儀表板',
      chart: {
        title: '圖表功能',
        startDate: '起始日期',
        endDate: '結束日期',
        pie: '圓餅圖',
        bar: '柱狀圖',
        radar: '雷達圖',
        scatter: '散點圖',
        line: '折線圖',
      },
    },
    vuePractice: {
      title: 'Vue 練習',
      stepForm: '分步驟表單',
    },
    jsPractice: {
      title: 'JavaScript 練習',
      practice1: 'JavaScript 練習 1',
    },
    system: {
      title: '系統設定',
      user: {
        title: '帳號設定',
        userName: '使用者名稱',
        account: '帳號名稱',
        createdAt: '建立時間',
      },
      taskManage: {
        title: '任務設定',
        taskName: '任務名稱',
        createdAt: '建立時間'
      },
    },
  },
  stepForm: {
    step1: {
      title: '基本資訊',
      fields: {
        username: {
          label: '用戶名',
          message: '用戶名不可為空',
        },
        email: {
          label: '電子郵件',
          required: '電子郵件不可為空',
          invalid: '電子郵件格式不正確',
        },
      },
    },
    step2: {
      title: '地址資訊',
      fields: {
        address: {
          label: '地址',
          message: '地址不可為空',
        },
        city: {
          label: '城市',
          message: '城市不可為空',
        },
      },
    },
    step3: {
      title: '同意條款',
      fields: {
        terms: {
          label: '我同意條款',
          message: '請同意條款',
        },
      },
    },
  },
  common: {
    prevStep: '上一步',
    nextStep: '下一步',
    submit: '提交',
    formSubmitted: '表單已成功提交！',
    requiredField: '此欄位為必填項',
    add: '新增',
    delete: '刪除',
    confirm: '確認',
    close: '關閉',
    inputPlaceholder: '輸入',
    selectPlaceholder: '選擇',
    clickPlaceholder: '點擊輸入',
  },
}
