// @/mock/modules/menu.ts
import type { ListDate } from '@/api/system/menu'
import { menuRoutes } from '@/router' // ✅ 直接导入
import { defineMock } from '@alova/mock'
import { resultSuccess } from '../_util'

function transformRouteToMenu(routes): ListDate[] {
  return routes
    .filter(route => route.meta?.key) // 确保有 key
    .map(route => {
      const menu: ListDate = {
        label: route.meta.title as string,
        key: route.meta.key as string,
        type: 1,
        subtitle: route.meta.key as string,
        openType: 1,
        auth: (route.meta.auth || route.meta.key) as string,
        path: route.path
      }

      if (route.children?.length) {
        menu.children = transformRouteToMenu(route.children)
      }

      return menu
    })
}

const menuList = transformRouteToMenu(menuRoutes)
console.log(menuList)

export default defineMock({
  '/api/menu/list': () => {
    return resultSuccess({ list: menuList })
  }
})
