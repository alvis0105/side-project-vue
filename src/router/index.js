import { createRouter, createWebHistory } from 'vue-router'
import { addDynamicRoutes } from './guard'
import { setupRouteGuard } from './guard'
import { menuList } from '../../mock/model/menu'
import systemRouter from './system-router'

const router = createRouter({
  history: createWebHistory(),
  routes: systemRouter
})

export async function setupRouter(app) {
  // 在初始化時添加動態路由
  addDynamicRoutes(router, menuList)
  setupRouteGuard(router)
  app.use(router)
  await router.isReady()
}

export default router
