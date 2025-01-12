import { useUserStore } from '@/stores/modules/user'
import { menuList } from '../../mock/model/menu'

// 使用 import.meta.glob 批量導入所有視圖組件
export const addDynamicRoutes = (router, list) => {
  const modules = import.meta.glob('/src/views/**/*') // 加載所有視圖組件

  list.forEach((menu) => {
    if (menu.children && menu.children.length > 0) {
      addDynamicRoutes(router, menu.children)
    } else {
      const component = resolveComponentPath(menu.path, modules)
      const route = {
        path: menu.path,
        name: menu.name,
        component: component || (() => import('/src/views/Error404.vue')), // 無法匹配則跳轉 404
        meta: menu.meta,
      }
      if (!router.hasRoute(route.name)) {
        router.addRoute('layout', route) // 添加到 layout 子路由
      }
    }
  })
}

export const setupRouteGuard = (router) => {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()

    if (!userStore.isAuthenticated && to.path !== '/login') {
      return next('/login')
    }

    if (to.path === '/login') {
      return next()
    }

    if (!userStore.isMenuLoaded) {
      try {
        addDynamicRoutes(router, menuList)

        // 標記菜單已加載
        userStore.setMenuLoaded(true)

        // 確保導航到目標頁面
        return next(to.fullPath)
      } catch (error) {
        console.error('動態路由載入失敗:', error)
        return next('/login')
      }
    }
    next()
  })
}

const resolveComponentPath = (menuPath, modules) => {

  // 將所有 module 鍵轉換為小寫並去掉 .vue 後綴
  const lowerCaseModules = {}
  Object.keys(modules).forEach((key) => {
    lowerCaseModules[key.toLowerCase().replace('.vue', '')] = modules[key]
  })

  // 將 menuPath 轉換為小寫格式並去掉
  let lowerCasePath = menuPath.toLowerCase().replace('/:id', '')

  // 使用 includes 檢測是否包含指定的檔案名稱
  let matchingKey = Object.keys(lowerCaseModules).find((key) =>
    key.includes(lowerCasePath)
  )

  // 針對index.vue做處理: 找不到對應檔名時退回上一層確認目錄是否找得到index.vue
  if (!matchingKey && lowerCasePath.includes('/')) {
    lowerCasePath = lowerCasePath.substring(0, lowerCasePath.lastIndexOf('/'))
    const indexPath = `${lowerCasePath}/index`
    matchingKey = Object.keys(lowerCaseModules).find((key) =>
      key.includes(indexPath)
    )
  }

  // 如果找到匹配的模組，返回模組，否則返回 null
  return matchingKey ? lowerCaseModules[matchingKey] : null
}

