import config from '@/config'

// 系統路由
const routes = [
  // 靜態路徑
  // {
  //   path: '/',
  //   component: () => import('../layout/index.vue'),
  //   redirect: '/home',
  //   children: [
  //     {
  //       name: 'home',
  //       path: 'home',
  //       component: () => import('../views/HomeView.vue'),
  //     },
  //     {
  //       name: 'dashboard',
  //       path: 'dashboard',
  //       component: () => import('../views/dashboard/index.vue'),
  //       meta: {
  //         title: '儀表板',
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/tasks',
  //   component: () => import('../layout/index.vue'),
  //   redirect: '/tasks/list',
  //   children: [
  //     {
  //       name: 'tasks',
  //       path: '/tasks/list',
  //       component: () => import('../views/tasks/index.vue'),
  //       meta: {
  //         title: '任務列表',
  //       },
  //     },
  //     {
  //       name: 'task-detail',
  //       path: '/tasks/detail/:id',
  //       component: () => import('../views/tasks/TaskDetail.vue'),
  //       meta: {
  //         title: '任務詳細',
  //       },
  //     },
  //     {
  //       name: 'task-add',
  //       path: '/tasks/add',
  //       component: () => import('../views/tasks/TaskAdd.vue'),
  //       meta: {
  //         title: '新增任務',
  //       },
  //     },
  //     {
  //       name: 'task-edit',
  //       path: '/tasks/edit/:id',
  //       component: () => import('../views/tasks/TaskEdit.vue'),
  //       meta: {
  //         title: '編輯任務',
  //       },
  //     },
  //   ],
  // },
  // {
  //   name: 'system',
  //   path: '/system',
  //   component: () => import('../layout/index.vue'),
  //   redirect: 'user',
  //   children: [
  //     {
  //       name: 'system-user',
  //       path: '/system/user',
  //       component: () => import('../views/user/index.vue'),
  //       meta: {
  //         title: '帳號設定',
  //       },
  //     },
  //     {
  //       name: 'system-tasks',
  //       path: '/system/tasks',
  //       component: () => import('../views/tasks/TaskManage.vue'),
  //       meta: {
  //         title: '任務設定',
  //       },
  //     },
  //   ],
  // },
  //動態路徑
  {
    path: '/',
    component: () => import('../layout/index.vue'),
    redirect: config.HOME_URL || '/home',
    children: [],
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/login/index.vue'),
    meta: {
      title: '登入',
    },
  },
  {
    name: 'sign',
    path: '/sign',
    component: () => import('../views/sign/index.vue'),
    meta: {
      title: '註冊',
    },
  },
]

export default routes
