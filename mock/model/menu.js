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
      description: '',
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
          description: '使用 vue-directive(含v-if, v-bind, v-on) 實作任務管理新刪修查功能並串接 vite-plugin-fake-server 模擬 mock API',
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
          title: '圖表功能',
          icon: 'PieChart',
          type: 'menu',
          description: '圖表功能描述待補',
        },
        component: '',
      },
    ]
  },
  {
    id: '40000',
    parentId: null,
    name: 'vue',
    path: '/vue',
    meta: {
      title: 'vue練習',
      icon: 'Reading',
      type: 'menu',
    },
    component: '',
    children: [
      {
        id: '40001',
        parentId: '40000',
        name: 'vuePractice',
        path: '/vuePractice',
        meta: {
          title: 'vue練習1',
          icon: 'Guide',
          type: 'menu',
          description: 'vue練習1的功能描述待補',
        },
        component: '',
      },
    ]
  },
  {
    id: '50000',
    parentId: null,
    name: 'javascript',
    path: '/javascript',
    meta: {
      title: 'javascript練習',
      icon: 'Reading',
      type: 'menu',
    },
    component: '',
    children: [
      {
        id: '50001',
        parentId: '50000',
        name: 'javascriptPractice',
        path: '/javascriptPractice',
        meta: {
          title: 'javascript練習1',
          icon: 'Guide',
          type: 'menu',
          description: 'javascript練習1的功能描述待補',
        },
        component: '',
      },
    ]
  },
  {
    id: '60000',
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
        id: '60001',
        parentId: '60000',
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
        id: '60002',
        parentId: '60000',
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
