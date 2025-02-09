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
    welcomeText: '介紹: ',
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
        errorMsg: '起始日期不可大於結束日期!',
      },
      video: {
        title: '影像播放器',
      },
    },
    vuePractice: {
      title: 'Vue 練習',
      stepForm: '分步驟表單',
      dynamicFilter: '動態篩選',
    },
    jsPractice: {
      title: 'JavaScript 練習',
      practice1: 'JS 及 Lodash 練習',
      method: '應用: ',
      default: '預設資料: ',
      output: '輸出結果: ',
      resetButton: '重置',
      itemName: '名稱',
      price: '價格',
      type: '種類',
      function1: '功能 1: 資料篩選',
      function1Button1: '篩選 "3C"',
      function1Button2: '篩選 "工具"',
      function2: '功能 2: 防止連續點擊',
      function2Button1: '防止連續按鈕',
      function2Button2: '可連點按鈕',
      function2Text1: '目前可觸發，但會防止連點',
      function2Text2: '不限制連續點擊',
      function2Text3: '目前已觸發, 請等5秒後再觸發!',
      count: '點擊次數: ',
      function3: '功能 3: 移除重複值',
      function3Button1: '移除重複值',
      function4: '功能 4: 恢復預設設置',
      function4Button1: '改成淺綠',
      function4Button2: '改成深綠',
      function5: '功能 5: 生成範圍',
      function5Button1: '生成範圍 1 ~ 10',
      function5Button2: '生成範圍 5 ~ 8',
      function5Text1: '尚未生成範圍',
      function6: '功能 6: 分組',
      function6Button1: '分成4組/每組3個',
      function6Button2: '分成2組/每組6個',
      function6Text1: '第',
      function6Text2: '組:',
      function6Text3: '尚無分組結果',
      function7: '功能 7: 查找最大/最小數值',
      function7Button1: '查找最大數值',
      function7Button2: '查找最小數值',
      function7Text1: '尚無結果',
      function8: '功能 8: 合併物件',
      function8Button1: '合併物件',
      function8Text1: '尚無合併結果',
      dataA: '資料A ',
      dataB: '資料B ',
      dataC: '資料C ',
      name: '姓名: ',
      age: '年齡: ',
      city: '城市: ',
      job: '職業: ',
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
  dynamicFilter: {
    item: '商品',
    filter: '篩選',
    minimum: '最低價格',
    maximum: '最高價格',
    total: '篩選後統計',
    count: '總數量',
    amount: '總金額',
    errorMsg: '最低價格不能高於最高價格！'
  },
  common: {
    notification: '提示',
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
