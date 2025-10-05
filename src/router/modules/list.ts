import { Layout } from '@/router/constant'
import { renderIcon } from '@/utils/index'
import { TableOutlined } from '@vicons/antd'
import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/list',
    name: 'List',
    redirect: '/list/basic-list',
    component: Layout,
    meta: {
      title: '列表页面',
      key: 'list',
      icon: renderIcon(TableOutlined),
      sort: 2
    },
    children: [
      {
        path: 'basic-list',
        name: 'basic-list',
        meta: {
          title: '基础列表',
          hidden: true
        },
        component: () => import('@/views/list/basicList/index.vue')
      },
      {
        path: 'EvaluationItems',
        name: 'EvaluationItems',
        meta: {
          title: '评定项目维护',
          key: 'evaluation-items'
        },
        component: () => import('@/views/list/EvaluationItems.vue')
      },
      {
        path: 'UserInfo',
        name: 'UserInfo',
        meta: {
          title: '用户信息管理',
          key: 'user-info'
        },
        component: () => import('@/views/list/UserInfo.vue')
      },
      {
        path: 'Interns',
        name: 'Interns',
        meta: {
          title: '实习生管理',
          key: 'interns'
        },
        component: () => import('@/views/list/Interns.vue')
      },
      {
        path: 'Wards',
        name: 'Wards',
        meta: {
          title: '病区维护',
          key: 'wards'
        },
        component: () => import('@/views/list/Wards.vue')
      },
      {
        path: 'Departments',
        name: 'Departments',
        meta: {
          title: '科室维护',
          key: 'departments'
        },
        component: () => import('@/views/list/Departments.vue')
      },
      {
        path: 'basic-info',
        name: 'basic-info-type',
        meta: {
          title: '修改通用格式',
          activeMenu: 'basic-list'
        },
        component: () => import('@/views/form/basicForm/index.vue')
      }
    ]
  }
]

export default routes
