export const menuList = [
  {
    id: '10000',
    parentId: null,
    name: 'home',
    path: '/HomeView',
    meta: {
      title: '首頁',
      icon: 'homefilled',
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
      icon: 'collection',
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
          type: 'menu',
        },
        component: '',
      },
      {
        id: '20002',
        parentId: '20000',
        name: 'taskDetail',
        path: '/tasks/taskDetail/:id',
        meta: {
          title: '任務詳細',
          type: 'menu',
        },
        component: '',
      },
      {
        id: '20003',
        parentId: '20000',
        name: 'taskAdd',
        path: '/tasks/taskAdd',
        meta: {
          title: '新增任務',
          type: 'button',
        },
        component: '',
      },
      {
        id: '20004',
        parentId: '20000',
        name: 'taskEdit',
        path: '/tasks/taskEdit/:id',
        meta: {
          title: '編輯任務',
          type: 'button',
        },
        component: '',
      },
    ]
  },
  {
    id: '30000',
    parentId: null,
    name: 'dashboard',
    path: '/dashboard',
    meta: {
      title: '儀表板',
      icon: 'dataanalysis',
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
          title: '時間軸和甘特圖',
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
      title: '系統',
      icon: 'setting',
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
          icon: 'userfilled',
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
          icon: 'tools',
          type: 'menu',
        },
        component: '',
      }
    ]
  }
]
