import HomeView from '../views/HomeView.vue'

// 系統路由
const routes = [
  {
    name: 'home',
    path: '/',
    component: HomeView
  },
  {
    name: 'about',
    path: '/about',
    component: () => import('../views/AboutView.vue')
  },
  // {
  //   name: 'login',
  //   path: '/login',
  //   component: () => import('../views/login/index.vue'),
  //   meta: {
  //     title: '登入',
  //   },
  // },
  // {
  //   name: 'sign',
  //   path: '/sign',
  //   component: () => import('../views/sign/index.vue'),
  //   meta: {
  //     title: '註冊',
  //   },
  // },
  // {
  //   name: 'tasks',
  //   path: '/tasks',
  //   component: () => import('../views/tasks/index.vue'),
  //   meta: {
  //     title: '任務列表',
  //   },
  // },
  // {
  //   name: 'task-detail',
  //   path: '/tasks/:id',
  //   component: () => import('../views/tasks/TaskDetail.vue'),
  //   meta: {
  //     title: '任務詳細',
  //   },
  // },
  // {
  //   name: 'task-add',
  //   path: '/tasks/add',
  //   component: () => import('../views/tasks/TaskAdd.vue'),
  //   meta: {
  //     title: '新增任務',
  //   },
  // },
  // {
  //   name: 'task-edit',
  //   path: '/tasks/:id/edit',
  //   component: () => import('../views/tasks/TaskEdit.vue'),
  //   meta: {
  //     title: '編輯任務',
  //   },
  // },
  // {
  //   name: 'task-manage',
  //   path: '/tasks/manage',
  //   component: () => import('../views/tasks/TaskManage.vue'),
  //   meta: {
  //     title: '任務管理',
  //   },
  // },
  // {
  //   name: 'dashboard',
  //   path: '/dashboard',
  //   component: () => import('../views/dashboard/index.vue'),
  //   meta: {
  //     title: '儀表板',
  //   },
  // },
]

export default routes
