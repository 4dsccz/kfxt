import { Alova } from '@/utils/http/alova'

export function getDynamicTable(params) {
  return Alova.Get('/table/list', { params })
}
