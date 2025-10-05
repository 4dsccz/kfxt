import { BasicColumn } from '@/components/Table'
import { NTag } from 'naive-ui'
import { h } from 'vue'

export interface WardItem {
  id: number // 自增主键
  BQDM: string // 病区代码
  BQMC: string // 病区名称
  KSDM: string | null // 对应科室代码
  HIS_BQDM: string | null // HIS系统病区代码
  note: string | null // 备注
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

export const columns: BasicColumn<WardItem>[] = [
  {
    title: '病区代码',
    key: 'BQDM',
    width: 120,
    resizable: true
  },
  {
    title: '病区名称',
    key: 'BQMC',
    width: 150,
    resizable: true
  },
  {
    title: '对应科室代码',
    key: 'KSDM',
    width: 140,
    resizable: true
  },
  {
    title: 'HIS病区代码',
    key: 'HIS_BQDM',
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
