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
    },
    vuePractice: {
      title: 'Vue-Practice',
      stepForm: 'Step-Form',
      watchEffect: 'WatchEffect',
    },
    jsPractice: {
      title: 'JavaScript-Practice',
      practice1: 'JavaScript-Practice 1',
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
  watchEffect: {
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
