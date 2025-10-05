import { BasicColumn } from '@/components/Table'

export interface InternItem {
  id: number // 主键
  YSBM: string | null // 编码
  YSXM: string | null // 姓名
  XB: number | null // 性别（1=男，2=女）
  CSRQ: string | null // 出生日期
  JDXX: string | null // 就读学校
  ZDLS: string | null // 指导老师
  LXDH: string | null // 联系电话
  JTDZ: string | null // 家庭地址
  LRRQ: string | null // 来院日期
  // YXBZ: number | null // （无备注）
  // PYDM: string | null // 拼音码
  // WBDM: string | null // （无备注）
  // is_valid: number // 有效状态（0=无效，1=有效）
  // zzzt: number // （无备注）
}

export const columns: BasicColumn<InternItem>[] = [
  {
    title: '编码',
    key: 'YSBM',
    width: 100,
    resizable: true
  },
  {
    title: '姓名',
    key: 'YSXM',
    width: 100,
    resizable: true
  },
  {
    title: '性别',
    key: 'XB',
    width: 80,
    resizable: true,
    render(record) {
      return record.XB === 1 ? '男' : record.XB === 2 ? '女' : ''
    }
  },
  {
    title: '出生日期',
    key: 'CSRQ',
    width: 120,
    resizable: true
  },
  {
    title: '就读学校',
    key: 'JDXX',
    width: 150,
    resizable: true
  },
  {
    title: '指导老师',
    key: 'ZDLS',
    width: 100,
    resizable: true
  },
  {
    title: '联系电话',
    key: 'LXDH',
    width: 130,
    resizable: true
  },
  {
    title: '家庭地址',
    key: 'JTDZ',
    width: 180,
    resizable: true
  },
  {
    title: '来院日期',
    key: 'LRRQ',
    width: 120,
    resizable: true
  }
]
