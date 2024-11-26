// guard.js
import { useUserStore } from '@/stores/modules/user'
import { menuList } from '@/../mock/model/menu'

// 使用 import.meta.glob 批量導入所有視圖組件
export const addDynamicRoutes = (router, list) => {
  const modules = import.meta.glob('/src/views/**/*') // 加載所有視圖組件
  console.log('Available modules:', modules)

  list.forEach((menu) => {
    if (menu.children && menu.children.length > 0) {
      addDynamicRoutes(router, menu.children)
    } else {
      const component = resolveComponentPath(menu.path, modules)
      console.log('component', component)
      const route = {
        path: menu.path,
        name: menu.name,
        component: component || (() => import('/src/views/Error404.vue')), // 無法匹配則跳轉 404
        meta: menu.meta,
      }

      console.log('Route:', route)

      if (!router.hasRoute(route.name)) {
        router.addRoute('layout', route) // 添加到 layout 子路由
      }
    }
  })
}

// 將menu新增進動態路徑
// export const addDynamicRoutes = (router, list) => {
//   list.forEach((menu) => {
//     if (menu.children && menu.children.length > 0) {
//       // 處理子menu
//       addDynamicRoutes(router, menu.children)
//     } else {
//       // 為每個menu創建並新增一個路由
//       console.log('menu', menu)
//       const route = {
//         path: menu.path,
//         name: menu.name,
//         component: () => import(`../views${menu.path.replace(/:.*/, '')}/index.vue`),
//         meta: menu.meta,
//       }
//       console.log('route', route)
//       if (!router.hasRoute(route.name)) {
//         router.addRoute('layout', route) // 新增路由到 layout 的子路由中
//       }
//     }
//   })
// }

// 初始化menu的導航守衛
// export const setupRouteGuard = (router) => {
//   router.beforeEach(async (to, from, next) => {
//     const userStore = useUserStore()

//     // 檢查是否已經登錄
//     if (!userStore.isAuthenticated && to.path !== '/login') {
//       next('/login')
//     } else {
//       // 渃menu還未載入時
//       if (!userStore.menuLoaded) {
//         try {
//           // 暫時用假資料，後續再替換成 mock API 調用
//           const menuList = await import('/mock/model/menu')

//           // 加載menu並新增動態路由
//           addDynamicRoutes(router, menuList.menuList)

//           // 標記menu已加載
//           userStore.setMenuLoaded(true)

//           // 繼續導航到原本的目標頁面
//           next(to.fullPath)
//         } catch (error) {
//           console.error('獲取menu失敗', error)
//           next('/login') // 如果獲取失敗則重定向到登入
//         }
//       } else {
//         next()
//       }
//     }
//   })
// }
export const setupRouteGuard = (router) => {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()

    if (!userStore.isAuthenticated && to.path !== '/login') {
      return next('/login')
    }

    if (!userStore.isMenuLoaded) {
      try {
        // const { menuList } = await import('@/mock/model/menu') // 假資料
        addDynamicRoutes(router, menuList)

        // 標記菜單已加載
        userStore.setMenuLoaded(true)

        // 確保導航到目標頁面
        return next(to.fullPath)
      } catch (error) {
        console.error('動態路由加載失敗:', error)
        return next('/login')
      }
    }

    next()
  })
}

const resolveComponentPath = (menuPath, modules) => {
  console.log('modules', modules)

  // 將所有 module 鍵轉換為小寫並去掉 .vue 後綴
  const lowerCaseModules = {}
  Object.keys(modules).forEach((key) => {
    lowerCaseModules[key.toLowerCase().replace('.vue', '')] = modules[key]
  })

  console.log('lowerCaseModules', lowerCaseModules)

  // 將 menuPath 轉換為小寫格式並去掉
  let lowerCasePath = menuPath.toLowerCase().replace('/:id', '')
  console.log('lowerCasePath', lowerCasePath)

  // 使用 includes 檢測是否包含指定的檔案名稱
  let matchingKey = Object.keys(lowerCaseModules).find((key) =>
    key.includes(lowerCasePath)
  )

  console.log('Matching Key:', matchingKey)

  // 針對index.vue做處理: 找不到對應檔名時退回上一層確認目錄是否找得到index.vue
  while (!matchingKey && lowerCasePath.includes('/')) {
    lowerCasePath = lowerCasePath.substring(0, lowerCasePath.lastIndexOf('/'))
    const indexPath = `${lowerCasePath}/index`
    matchingKey = Object.keys(lowerCaseModules).find((key) =>
      key.includes(indexPath)
    )
  }

  // 如果找到匹配的模組，返回模組，否則返回 null
  return matchingKey ? lowerCaseModules[matchingKey] : null
}
// const resolveComponentPath = (menuPath, modules) => {
//   console.log('menuPath', menuPath)
//   console.log('modules', modules)
//   // 將所有 module 鍵轉換為小寫
//   const lowerCaseModules = Object.keys(modules).reduce((acc, key) => {
//     acc[key.toLowerCase()] = modules[key]
//     return acc
//   }, {})
//   // const lowerCaseModules = {}
//   // Object.keys(modules).forEach((key) => {
//   //   lowerCaseModules[key.toLowerCase().replace('.vue', '')] = modules[key]
//   // })
//   console.log('lowerCaseModules', lowerCaseModules)
//   // 將 menuPath 轉換為小寫格式
//   const lowerCasePath = menuPath.toLowerCase()
//   console.log('lowerCasePath', lowerCasePath)
//   console.log('處理完的結果路徑', lowerCaseModules[lowerCasePath])
//   // 比對模組是否存在
//   return lowerCaseModules[lowerCasePath] || null
// }
