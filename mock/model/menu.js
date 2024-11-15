export const menuList = [
  {
    id: '10000',
    parentId: null,
    name: 'home',
    path: '/home',
    meta: {
      title: '首頁',
      icon: 'ep-home-filled',
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
      icon: 'ep-collection',
      type: 'menu',
    },
    component: '',
    children: [
      {
        id: '20001',
        parentId: '20000',
        name: 'tasks.list',
        path: '/tasks/list',
        meta: {
          title: '任務列表',
          type: 'menu',
        },
        component: '',
      },
      {
        id: '20002',
        parentId: '20000',
        name: 'tasks.detail',
        path: '/tasks/detail/:id',
        meta: {
          title: '任務詳細',
          type: 'menu',
        },
        component: '',
      },
      {
        id: '20003',
        parentId: '20000',
        name: 'tasks.add',
        path: '/tasks/add',
        meta: {
          title: '新增任務',
          type: 'button',
        },
        component: '',
      },
      {
        id: '20004',
        parentId: '20000',
        name: 'tasks.edit',
        path: '/tasks/edit/:id',
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
      icon: 'ep-data-analysis',
      type: 'menu',
    },
    component: '',
    children: [
      {
        id: '30001',
        parentId: '30000',
        name: 'dashboard.timeline',
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
      icon: 'ep-setting',
      type: 'menu',
    },
    children: [
      {
        id: '40001',
        parentId: '40000',
        name: 'system.user',
        path: '/system/user',
        meta: {
          title: '帳號設定',
          icon: 'ep-user-filled',
          type: 'menu',
        },
        component: '',
      },
      {
        id: '40002',
        parentId: '40000',
        name: 'system.tasks',
        path: '/system/tasks',
        meta: {
          title: '任務設定',
          type: 'menu',
        },
        component: '',
      }
    ]
  }
]
