import { useUserStore } from '@/stores/modules/user'

// 將menu新增進動態路徑
export const addDynamicRoutes = (router, menuList) => {
  menuList.forEach((menu) => {
    if (menu.children && menu.children.length > 0) {
      // 處理子menu
      addDynamicRoutes(router, menu.children)
    } else {
      // 為每個menu創建並新增一個路由
      const route = {
        path: menu.path,
        name: menu.name,
        component: () => import(`../views${menu.path.replace(/:.*/, '')}/index.vue`),
        meta: menu.meta,
      }
      if (!router.hasRoute(route.name)) {
        router.addRoute('layout', route) // 新增路由到 layout 的子路由中
      }
    }
  })
}

// 初始化menu的導航守衛
export const setupRouteGuard = (router) => {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()

    // 檢查是否已經登錄
    if (!userStore.isAuthenticated && to.path !== '/login') {
      next('/login')
    } else {
      // 渃menu還未載入時
      if (!userStore.menuLoaded) {
        try {
          // 暫時用假資料，後續再替換成 mock API 調用
          const menuList = await import('/mock/model/menu')

          // 加載menu並新增動態路由
          addDynamicRoutes(router, menuList.menuList)

          // 標記menu已加載
          userStore.setMenuLoaded(true)

          // 繼續導航到原本的目標頁面
          next(to.fullPath)
        } catch (error) {
          console.error('獲取menu失敗', error)
          next('/login') // 如果獲取失敗則重定向到登入
        }
      } else {
        next()
      }
    }
  })
}
