import { Alova } from '@/utils/http/alova/index'

//获取table
export function getEvaluationItemsList(params) {
  return Alova.Post('/table/list', { params })
}

export function getUserInfosList(params) {
  return Alova.Post('/table/list', { params })
}
