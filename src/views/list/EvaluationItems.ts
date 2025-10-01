import { BasicColumn } from '@/components/Table'
import { NTag } from 'naive-ui'
import { h } from 'vue'

// 对应 [dbo].[TB_KF_PDXM] 表结构
export interface PdXmItem {
  id: number
  pdxmlb: string // 评定项目类别
  pdxmbm: string // 评定项目编码
  pdxmmc: string // 评定项目名称
  note?: string // 备注（可为空）
  is_valid: number // 1=有效，0=无效
}

// 状态映射：有效标志
const validMap = {
  1: '有效',
  0: '无效'
}

// 输入模式映射
const inputModeMap = {
  sel: '下拉选择',
  input: '文本输入'
}

// Naive UI 标签类型映射
const getValidTagType = (isValid: number) => (isValid === 1 ? 'success' : 'error')

export const columns: BasicColumn<PdXmItem>[] = [
  {
    title: '项目编码',
    key: 'pdxmbm',
    width: 120,
    resizable: true
  },
  {
    title: '项目名称',
    key: 'pdxmmc',
    width: 180,
    resizable: true
  },
  {
    title: '类别',
    key: 'pdxmlb',
    width: 150,
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
