import { BasicColumn } from '@/components/Table'
import { NTag } from 'naive-ui'
import { h } from 'vue'

// 对应用户表结构（假设表名为 [dbo].[TB_User] 或类似）
export interface UserItem {
  id: number
  Opcode: string // 登录账号
  Opname: string // 用户姓名
  // gcode?: string // 所属部门（可为空）
  // pwd: string // 登录密码
  createdate: string // 创建日期（ISO 字符串或格式化字符串）
  // stdate: string // 开始日期
  // endate?: string // 结束日期（可为空）
  Is_valid: number // 1=有效，0=无效
  sex?: string // 性别
  tel?: string // 联系方式
  email?: string // 邮箱
  // Roles?: string // 权限
  // WebRoles?: string
  HISUSERID?: string // 在HIS的ID
  // rolecode?: string
}

// 状态映射：有效标志
const validMap = {
  1: '有效',
  0: '无效'
}

// Naive UI 标签类型映射
const getValidTagType = (isValid: number) => (isValid === 1 ? 'success' : 'error')

export const columns: BasicColumn<UserItem>[] = [
  {
    title: '登录账号',
    key: 'Opcode',
    width: 120,
    resizable: true
  },
  {
    title: '用户姓名',
    key: 'Opname',
    width: 120,
    resizable: true
  },
  {
    title: '性别',
    key: 'sex',
    width: 80,
    resizable: true
  },
  {
    title: '联系方式',
    key: 'tel',
    width: 150,
    resizable: true
  },
  {
    title: '邮箱',
    key: 'email',
    width: 200,
    resizable: true
  },
  {
    title: '创建日期',
    key: 'createdate',
    width: 160,
    resizable: true
  },
  {
    title: 'HISUSERID',
    key: 'HISUSERID',
    width: 120,
    resizable: true
  },
  {
    title: '状态',
    key: 'Is_valid',
    width: 100,
    resizable: true,
    render(record) {
      return h(
        NTag,
        {
          type: getValidTagType(record.Is_valid)
        },
        {
          default: () => validMap[record.Is_valid as 0 | 1]
        }
      )
    }
  }
]
