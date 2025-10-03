import { NPopover, NTag } from 'naive-ui'
import { h } from 'vue'

export const columns = [
  {
    title: '角色编码',
    key: 'rcode',
    resizable: true,
    expandable: true
  },
  {
    title: '角色名称',
    key: 'rname',
    resizable: true
  },
  {
    title: '角色类别',
    key: 'rtype',
    resizable: true
  },
  {
    title: '有效标识',
    key: 'isvalid',
    resizable: true,
    render(row) {
      return h(
        NTag,
        {
          type: row.isDefault ? 'success' : 'error'
        },
        {
          default: () => (row.isDefault ? '是' : '否')
        }
      )
    }
  },
  {
    title: '描述',
    key: 'note',
    resizable: true,
    render(row) {
      const note = String(row.note || '').trim()
      if (!note) {
        return h('span', { style: { color: '#999' } }, '——')
      }

      const displayText = note.length > 30 ? note.substring(0, 30) + '...' : note

      return h(
        NPopover,
        {
          trigger: 'hover',
          placement: 'top-start', // ← 关键：让弹出层从左侧开始
          offset: [0, -8], // 微调位置，避免遮挡
          width: 600,
          showArrow: true,
          style: {
            // 强制最小宽度，防止被压得太窄
            minWidth: '500px',
            maxWidth: '900px'
          }
        },
        {
          trigger: () =>
            h(
              'span',
              {
                style: {
                  cursor: 'default',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }
              },
              displayText
            ),
          default: () =>
            h(
              'div',
              {
                style: {
                  fontSize: '13px',
                  lineHeight: '1.5',
                  wordBreak: 'break-all', // 强制断行
                  maxHeight: '300px',
                  overflow: 'auto', // 超出滚动
                  padding: '8px 12px'
                }
              },
              note
            )
        }
      )
    }
  }
]
