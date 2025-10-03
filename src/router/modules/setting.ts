import { Layout } from '@/router/constant'
import { renderIcon } from '@/utils/index'
import { SettingOutlined } from '@vicons/antd'
import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/setting',
    name: 'Setting',
    redirect: '/setting/account',
    component: Layout,
    meta: {
      title: '设置页面',
      key: 'setting',
      icon: renderIcon(SettingOutlined),
      sort: 5
    },
    children: [
      {
        path: 'account',
        name: 'setting-account',
        meta: {
          title: '个人设置',
          key: 'setting-account'
        },
        component: () => import('@/views/setting/account/account.vue')
      }
      // {
      //   path: 'system',
      //   name: 'setting-system',
      //   meta: {
      //     title: '系统设置'
      //   },
      //   component: () => import('@/views/setting/system/system.vue')
      // }
    ]
  }
]

export default routes
