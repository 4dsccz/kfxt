import { Layout } from '@/router/constant'
import { renderIcon } from '@/utils/index'
import { DocumentTextOutline } from '@vicons/ionicons5'
import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/external',
    name: 'External',
    component: Layout,
    meta: {
      title: '项目文档',
      icon: renderIcon(DocumentTextOutline),
      sort: 11
    }
  }
]

export default routes
