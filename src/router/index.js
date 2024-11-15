import { createRouter, createWebHistory } from 'vue-router'
import { setupRouteGuard } from './guard'
import systemRouter from './system-router'

const router = createRouter({
  history: createWebHistory(),
  routes: systemRouter
})

export async function setupRouter(app) {
  setupRouteGuard(router)
  app.use(router)
  await router.isReady()
}

export default router
