export const taskType = [
  {
    id: '1',
    name: '主要任務',
    createdAt: '2023-09-12'
  },
  {
    id: '2',
    name: '支線任務',
    createdAt: '2023-12-16'
  },
  {
    id: '3',
    name: '通用工具',
    createdAt: '2023-11-12'
  },
]

export const taskList = [
  {
    id: 1,
    taskName: 'A專案開發',
    taskType: '主要任務',
    startDate: '2023-01-12',
    endDate: '2023-08-25',
    subTasks: [
      { id: 1, subTaskName: 'API 規劃', detail: '針對API進行優化並且.....', startDate: '2023-02-12', endDate: '2023-03-13' },
      { id: 2, subTaskName: 'UI 設計', detail: '', startDate: '2023-07-01', endDate: '2023-09-23' },
      { id: 3, subTaskName: '功能開發', detail: '', startDate: '2023-08-26', endDate: '2023-10-03' },
      { id: 4, subTaskName: '套件研究', detail: '', startDate: '2023-03-25', endDate: '2023-07-11' },
    ],
    expanded: false,
  },
  {
    id: 2,
    taskName: 'vue3練習題',
    taskType: '支線任務',
    startDate: '2023-12-16',
    endDate: '2023-11-20',
    subTasks: [
      { id: 1, subTaskName: '題目撰寫', detail: '', startDate: '2023-12-16', endDate: '2023-12-18' },
    ],
    expanded: false,
  },
  {
    id: 3,
    taskName: '數值計算器',
    taskType: '功能型工具',
    startDate: '2023-11-12',
    endDate: '2023-12-14',
    subTasks: [
      { id: 1, subTaskName: 'UI 設計', detail: '', startDate: '2023-11-12', endDate: '2023-11-13' },
    ],
    expanded: false,
  },
  {
    id: 4,
    taskName: '套件升級',
    taskType: '支線任務',
    startDate: '2023-09-01',
    endDate: '2023-11-12',
    subTasks: [
      { id: 1, subTaskName: 'eslint升級', detail: '', startDate: '2023-10-02', endDate: '2023-12-13' },
      { id: 2, subTaskName: 'nodejs', detail: '', startDate: '2023-10-05', endDate: '2023-11-16' },
    ],
    expanded: false,
  },
]