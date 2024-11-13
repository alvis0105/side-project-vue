import { createRouter, createWebHistory } from 'vue-router'
import systemRouter from './system-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: systemRouter
})

export default router
