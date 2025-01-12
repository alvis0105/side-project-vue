const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('../layout/index.vue'),
    redirect: '/home',
    children: [], // 子路由將透過動態載入的方式添加
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/login/index.vue'),
    meta: {
      title: '登入',
    },
  },
]

export default routes
