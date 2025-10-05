import { BasicColumn } from '@/components/Table'
import { NTag } from 'naive-ui'
import { h } from 'vue'

export interface DepartmentItem {
  id: number // 自增主键
  KSDM: string // 科室代码
  KSMC: string // 科室名称
  YB_KSDM: string // 科室医保代码
  HIS_KSDM: string // HIS系统科室代码
  note: string // 备注
  mzy: number // 门住院（1=门诊，2=住院）
  // YQDM: string // 机构院区代码
  is_valid: number // 有效标识（0=无效，1=有效）
}

// 状态映射：有效标志
const validMap = {
  1: '有效',
  0: '无效'
}

// Naive UI 标签类型映射
const getValidTagType = (isValid: number) => (isValid === 1 ? 'success' : 'error')

export const columns: BasicColumn<DepartmentItem>[] = [
  {
    title: '科室代码',
    key: 'KSDM',
    width: 120,
    resizable: true
  },
  {
    title: '科室名称',
    key: 'KSMC',
    width: 150,
    resizable: true
  },
  {
    title: '医保代码',
    key: 'YB_KSDM',
    width: 120,
    resizable: true
  },
  {
    title: 'HIS科室代码',
    key: 'HIS_KSDM',
    width: 140,
    resizable: true
  },
  {
    title: '备注',
    key: 'note',
    width: 150,
    resizable: true
  },
  {
    title: '门住院',
    key: 'mzy',
    width: 100,
    resizable: true,
    render(record) {
      return record.mzy === 1 ? '门诊' : record.mzy === 2 ? '住院' : ''
    }
  },
  {
    title: '状态',
    key: 'is_valid',
    width: 100,
    resizable: true,
    render(record) {
      return h(
        NTag,
        {
          type: getValidTagType(record.is_valid)
        },
        {
          default: () => validMap[record.is_valid as 0 | 1]
        }
      )
    }
  }
]
