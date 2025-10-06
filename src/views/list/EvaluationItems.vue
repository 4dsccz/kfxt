<template>
  <n-card :bordered="false">
    <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset">
      <template #statusSlot="{ model, field }">
        <n-input v-model:value="model[field]" />
      </template>
    </BasicForm>
  </n-card>
  <n-card :bordered="false" class="mt-3">
    <BasicTable
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row:PdXmItem) => row.id"
      ref="actionRef"
      :actionColumn="actionColumn"
      @update:checked-row-keys="onCheckedRow"
      :scroll-x="1090"
      :striped="true"
      :resizable="true"
    >
      <template #tableTitle>
        <n-button type="primary" @click="addTable">
          <template #icon>
            <n-icon>
              <PlusOutlined />
            </n-icon>
          </template>
          新建
        </n-button>
      </template>

      <template #toolbar></template>
    </BasicTable>

    <CreateModal ref="createModalRef" />
  </n-card>
</template>

<script lang="ts" setup>
import { getEvaluationItemsList } from '@/api/table/list'
import { BasicForm, FormSchema, useForm } from '@/components/Form/index'
import { BasicTable, TableAction } from '@/components/Table'
import { PlusOutlined } from '@vicons/antd'
import { h, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import CreateModal from './CreateEvaluationItems.vue'
import { columns, PdXmItem } from './EvaluationItems'

const createModalRef = ref()

const schemas: FormSchema[] = [
  {
    field: 'pdxmbm',
    component: 'NInput',
    label: '项目编码',
    componentProps: { placeholder: '请输入项目编码' }
  },
  {
    field: 'pdxmmc',
    component: 'NInput',
    label: '项目名称',
    componentProps: { placeholder: '请输入项目名称' }
  },
  {
    field: 'pdxmlb',
    component: 'NInput', // 或 NSelect（若类别固定）
    label: '类别',
    componentProps: { placeholder: '请输入类别' }
  },
  {
    field: 'is_valid',
    component: 'NSelect',
    label: '状态',
    componentProps: {
      placeholder: '请选择状态',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }
  }
]

const router = useRouter()
const actionRef = ref()

const actionColumn = reactive({
  width: 220,
  title: '操作',
  key: 'action',
  fixed: 'right',
  render(record) {
    return h(TableAction as any, {
      style: 'button',
      actions: [
        {
          label: '删除',
          onClick: handleDelete.bind(null, record),
          // 根据业务控制是否显示 isShow 和 auth 是并且关系
          ifShow: () => {
            return true
          },
          // 根据权限控制是否显示: 有权限，会显示，支持多个
          auth: ['basic_list']
        },
        {
          label: '编辑',
          onClick: handleEdit.bind(null, record),
          ifShow: () => {
            return true
          },
          auth: ['basic_list']
        }
      ],
      select: key => {
        window['$message'].info(`您点击了，${key} 按钮`)
      }
    })
  }
})

const [register, { getFieldsValue }] = useForm({
  gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
  labelWidth: 80,
  schemas
})

function addTable() {
  createModalRef.value.openModal()
}

const loadDataTable = async res => {
  return await getEvaluationItemsList({ ...getFieldsValue(), ...res })
}

function onCheckedRow(rowKeys) {
  console.log(rowKeys)
}

function reloadTable() {
  actionRef.value.reload()
}

function handleEdit(record: Recordable) {
  console.log('点击了编辑', record)
  router.push({ name: 'basic-info', params: { id: record.id } })
}

function handleDelete(record: Recordable) {
  console.log('点击了删除', record)
  window['$message'].info('点击了删除')
}

function handleSubmit(values: Recordable) {
  console.log(values)
  reloadTable()
}

function handleReset(values: Recordable) {
  console.log(values)
}
</script>

<style lang="less" scoped></style>
