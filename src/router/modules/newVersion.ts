import { Layout } from '@/router/constant'
import { renderIcon } from '@/utils/index'
import { SketchOutlined } from '@vicons/antd'
import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/newversion',
    name: 'NewVersion',
    component: Layout,
    meta: {
      title: '',
      icon: renderIcon(SketchOutlined),
      sort: 12
    }
    // children: [
    //   {
    //     path: 'index',
    //     name: 'NewVersionIndex',
    //     meta: {
    //       title: '',
    //       icon: renderNew(),
    //       affix: true
    //     },
    //     component: () => import('@/views/newVersion/index.vue')
    //   }
    // ]
  }
]

export default routes
