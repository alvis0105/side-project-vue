import en from 'element-plus/es/locale/lang/en';

export default {
  el: en, // Element Plus 英文語言包
  config: {
    title: 'Multi-Application Platform'
  },
  message: {
    login: 'Login',
    logout: 'Logout',
    accountPlaceholder: 'Enter your account',
    passwordPlaceholder: 'Enter your password',
    loading: 'Loading...',
    welcome: 'Welcome to the application',
    welcomeText: 'Intro: ',
  },
  description: {
    title: 'Description:',
  },
  menu: {
    home: 'Home',
    tasks: {
      title: 'Task-Management',
      taskList: {
        title: 'Task-List',
        taskName: 'Task-Name',
        taskType: 'Task-Type',
        subTaskName: 'SubTask-Name',
        detail: 'Detail',
        startDate: 'Start-Date',
        endDate: 'End-Date',
      },
    },
    dashboard: {
      title: 'Dashboard',
      chart: {
        title: 'Charts',
        startDate: 'Start-Date',
        endDate: 'End-Date',
        pie: 'Pie-Chart',
        bar: 'Bar-Chart',
        radar: 'Radar-Chart',
        scatter: 'Scatter-Chart',
        line: 'Line-Chart',
        errorMsg: 'Start-date cannot be later than the End-date!',
      },
      video: {
        title: '影像播放器',
      },
    },
    vuePractice: {
      title: 'Vue-Practice',
      stepForm: 'Step-Form',
      dynamicFilter: 'DynamicFilter',
    },
    jsPractice: {
      title: 'JavaScript-Practice',
      practice1: 'JS & Lodash Practice',
      method: 'Method: ',
      default: 'Default: ',
      output: 'Output:',
      resetButton: 'Reset',
      itemName: 'Item',
      price: 'Price',
      type: 'Type',
      function1: 'Func 1: Data Filter',
      function1Button1: 'Filter "3C"',
      function1Button2: 'Filter "Tools"',
      function2: 'Func 2: Prevent Multiple Clicks',
      function2Button1: 'Prevent Multiple Clicks',
      function2Button2: 'Multiple Clicks',
      function2Text1: 'Trigger is available now, but prevent multiple clicks',
      function2Text2: 'Multiple clicks are allowed',
      function2Text3: 'The function is triggered now, please try again after 5 seconds!',
      count: 'Click Count: ',
      function3: 'Func 3: Remove the duplicated data',
      function3Button1: 'Remove Duplicates',
      function4: 'Func 4: Reset to the default',
      function4Button1: 'Set to Light Green',
      function4Button2: 'Set to Dark Green',
      function5: 'Func 5: Generate Range',
      function5Button1: 'Generate Range 1 ~ 10',
      function5Button2: 'Generate Range 5 ~ 8',
      function5Text1: 'To Be Generated...',
      function6: 'Func 6: Chunk',
      function6Button1: 'Chunk into 4 groups of 3',
      function6Button2: 'Chunk into 2 groups of 6',
      function6Text1: 'Group ',
      function6Text2: ':',
      function6Text3: 'To be Chunk...',
      function7: 'Func 7: Find Max/Min',
      function7Button1: 'Find Maximum',
      function7Button2: 'Find Minimum',
      function7Text1: 'No Result',
      function8: 'Func 8: Merge',
      function8Button1: 'Merge',
      function8Text1: 'To be Merged...',
      dataA: 'Data A ',
      dataB: 'Data B ',
      dataC: 'Data C ',
      name: 'Name: ',
      age: 'Age: ',
      city: 'City: ',
      job: 'Job: ',
    },
    system: {
      title: 'System-Settings',
      user: {
        title: 'User-Settings',
        userName: 'User-Name',
        account: 'Account',
        createdAt: 'Created-At',
      },
      taskManage: {
        title: 'Task-Management',
        taskName: 'Task-Name',
        createdAt: 'Created-At'
      },
    },
  },
  stepForm: {
    step1: {
      title: 'Basic Information',
      fields: {
        username: {
          label: 'Username',
          message: 'Username is required',
        },
        email: {
          label: 'Email',
          required: 'Email is required',
          invalid: 'Invalid email format',
        },
      },
    },
    step2: {
      title: 'Address Information',
      fields: {
        address: {
          label: 'Address',
          message: 'Address is required',
        },
        city: {
          label: 'City',
          message: 'City is required',
        },
      },
    },
    step3: {
      title: 'Agree to Terms',
      fields: {
        terms: {
          label: 'I agree to the terms',
          message: 'You must agree to the terms',
        },
      },
    },
  },
  dynamicFilter: {
    item: 'Item',
    filter: 'Filter',
    minimum: 'Minimum-Price',
    maximum: 'Maximum-Price',
    total: 'Filtered Results',
    count: 'Total Quantity',
    amount: 'Total Amount',
    errorMsg: 'Minimum-Price cannot be higher than Maximum-Price!'
  },
  common: {
    notification: 'Notification',
    prevStep: 'Previous Step',
    nextStep: 'Next Step',
    submit: 'Submit',
    formSubmitted: 'Form successfully submitted!',
    requiredField: 'This field is required',
    add: 'Add',
    delete: 'Delete',
    confirm: 'Confirm',
    close: 'Close',
    inputPlaceholder: 'Please enter ',
    selectPlaceholder: 'Please select ',
    clickPlaceholder: 'Click to enter',
  },
}
