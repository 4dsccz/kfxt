<template>
  <n-card :bordered="false" class="proCard">
    <BasicTable
      title="表格列表"
      titleTooltip="这是一个提示"
      :request="loadDynamicTable"
      :row-key="(row: { id: any }) => row.id"
      ref="actionRef"
      :actionColumn="actionColumn"
      :params="tableParams"
      :scroll-x="1360"
      @update:checked-row-keys="onCheckedRow"
    />
  </n-card>
</template>

<script lang="ts" setup>
import { getDynamicTable } from '@/api/table/dynamic'
import { BasicTable, TableAction } from '@/components/Table'
import { DeleteOutlined, EditOutlined } from '@vicons/antd'
import { useDialog, useMessage } from 'naive-ui'
import { h, reactive, ref } from 'vue'

const message = useMessage()
const dialog = useDialog()
const actionRef = ref()

const tableParams = reactive({
  dbSource: 'mysql_prod', // 数据库标识
  tableName: 'kfxt_users' // 表名（可选）
})

const loadDynamicTable = async (pagination: { page: any; pageSize: any }) => {
  const res = await getDynamicTable({
    ...tableParams,
    current: pagination.page,
    size: pagination.pageSize
  })

  return {
    list: res.list,
    total: res.total,
    // 👇 关键：把 columns 也返回给 BasicTable
    columns: res.columns
  }
}

const actionColumn = reactive({
  width: 180,
  title: '操作',
  key: 'action',
  fixed: 'right',
  align: 'center',
  render(record) {
    return h(TableAction as any, {
      style: 'button',
      actions: createActions(record)
    })
  }
})

function createActions(record) {
  return [
    {
      label: '删除',
      // 配置 color 会覆盖 type
      icon: DeleteOutlined,
      onClick: handleDelete.bind(null, record),
      // 根据权限控制是否显示: 有权限，会显示，支持多个
      auth: ['basic_list']
    },
    {
      label: '编辑',
      icon: EditOutlined,
      onClick: handleEdit.bind(null, record),
      auth: ['basic_list']
    }
  ]
}

function onCheckedRow(rowKeys) {
  console.log(rowKeys)
}

function handleDelete(record) {
  console.log(record)
  dialog.info({
    title: '提示',
    content: `您想删除${record.name}`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      message.success('删除成功')
    },
    onNegativeClick: () => {}
  })
}

function handleEdit(record) {
  console.log(record)
  message.success('您点击了编辑按钮')
}
</script>

<style lang="less" scoped></style>
