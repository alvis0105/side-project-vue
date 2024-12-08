export const menuList = [
  {
    id: '10000',
    parentId: null,
    name: 'home',
    path: '/home',
    meta: {
      title: '首頁',
      icon: 'House',
      type: 'menu',
    },
    component: '',
  },
  {
    id: '20000',
    parentId: null,
    name: 'tasks',
    path: '/tasks',
    meta: {
      title: '任務管理',
      icon: 'Collection',
      type: 'menu',
    },
    component: '',
    children: [
      {
        id: '20001',
        parentId: '20000',
        name: 'taskList',
        path: '/tasks/taskList',
        meta: {
          title: '任務列表',
          icon: 'Menu',
          type: 'menu',
        },
        component: '',
      },
      // {
      //   id: '20002',
      //   parentId: '20000',
      //   name: 'taskDetail',
      //   path: '/tasks/taskDetail/:id',
      //   meta: {
      //     title: '任務詳細',
      //     icon: 'Document',
      //     type: 'menu',
      //   },
      //   component: '',
      // },
      // {
      //   id: '20003',
      //   parentId: '20000',
      //   name: 'taskAdd',
      //   path: '/tasks/taskAdd',
      //   meta: {
      //     title: '新增任務',
      //     icon: 'Plus',
      //     type: 'button',
      //   },
      //   component: '',
      // },
      // {
      //   id: '20004',
      //   parentId: '20000',
      //   name: 'taskEdit',
      //   path: '/tasks/taskEdit/:id',
      //   meta: {
      //     title: '編輯任務',
      //     icon: 'Edit',
      //     type: 'button',
      //   },
      //   component: '',
      // },
    ]
  },
  {
    id: '30000',
    parentId: null,
    name: 'dashboard',
    path: '/dashboard',
    meta: {
      title: '儀表板',
      icon: 'DataAnalysis',
      type: 'menu',
    },
    component: '',
    children: [
      {
        id: '30001',
        parentId: '30000',
        name: 'chart',
        path: '/dashboard',
        meta: {
          title: '圖表資料',
          icon: 'Piechart',
          type: 'menu',
        },
        component: '',
      },
      {
        id: '30002',
        parentId: '30000',
        name: 'chart',
        path: '/dashboard',
        meta: {
          title: '圖表資料2',
          icon: 'Piechart',
          type: 'menu',
        },
        component: '',
      },
      {
        id: '30003',
        parentId: '30000',
        name: 'chart',
        path: '/dashboard',
        meta: {
          title: '圖表資料3',
          icon: 'Piechart',
          type: 'menu',
        },
        component: '',
      },
      {
        id: '30004',
        parentId: '30000',
        name: 'chart',
        path: '/dashboard',
        meta: {
          title: '圖表資料4',
          icon: 'Piechart',
          type: 'menu',
        },
        component: '',
      },
      {
        id: '30005',
        parentId: '30000',
        name: 'chart',
        path: '/dashboard',
        meta: {
          title: '圖表資料5',
          icon: 'Piechart',
          type: 'menu',
        },
        component: '',
      },
      {
        id: '30006',
        parentId: '30000',
        name: 'chart',
        path: '/dashboard',
        meta: {
          title: '圖表資料6',
          icon: 'Piechart',
          type: 'menu',
        },
        component: '',
      }
    ]
  },
  {
    id: '40000',
    parentId: null,
    name: 'system',
    path: '/system',
    meta: {
      title: '系統設定',
      icon: 'Setting',
      type: 'menu',
    },
    children: [
      {
        id: '40001',
        parentId: '40000',
        name: 'user',
        path: '/user',
        meta: {
          title: '帳號設定',
          icon: 'UserFilled',
          type: 'menu',
        },
        component: '',
      },
      {
        id: '40002',
        parentId: '40000',
        name: 'TaskManage',
        path: '/TaskManage',
        meta: {
          title: '任務設定',
          icon: 'Tools',
          type: 'menu',
        },
        component: '',
      }
    ]
  }
]
