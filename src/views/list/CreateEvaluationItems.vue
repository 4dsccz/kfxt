<template>
  <basicModal @register="modalRegister" ref="modalRef" @on-ok="okModal">
    <div class="pt-8">
      <BasicForm @register="registerForm" />
    </div>
  </basicModal>
</template>

<script lang="ts" setup>
import { FormSchema, useForm } from '@/components/Form'
import { basicModal, useModal } from '@/components/Modal'

const schemas: FormSchema[] = [
  {
    field: 'code',
    component: 'NInput',
    label: '项目编码',
    componentProps: {
      placeholder: '请输入项目编码'
    },
    rules: [{ required: true, message: '请输入项目编码', trigger: ['blur'] }]
  },
  {
    field: 'name',
    component: 'NInput',
    label: '项目名称',
    componentProps: {
      placeholder: '请输入项目名称'
    },
    rules: [{ required: true, message: '请输入项目名称', trigger: ['blur'] }]
  },
  {
    field: 'explain',
    component: 'NInput',
    label: '备注',
    componentProps: {
      type: 'textarea',
      placeholder: '请输入备注'
    }
  },
  {
    field: 'type',
    component: 'NSelect',
    label: '类别',
    componentProps: {
      placeholder: '请选择类别',
      options: [
        { label: '护理', value: 'admin' },
        { label: '医疗', value: 'user' }
      ]
    },
    rules: [{ required: true, message: '请选择类别', trigger: ['blur', 'change'] }]
  },
  {
    field: 'isDefault',
    component: 'NSwitch',
    label: '状态',
    componentProps: {}
  }
]

const [registerForm, { submit }] = useForm({
  gridProps: { cols: 1 },
  collapsedRows: 3,
  labelWidth: 80,
  layout: 'horizontal',
  submitButtonText: '保存',
  showActionButtonGroup: false,
  schemas
})

const [modalRegister, { openModal, closeModal, setSubLoading }] = useModal({
  title: '新增评定项目',
  subBtuText: '保存'
})

async function okModal() {
  const formRes = await submit()
  if (formRes) {
    closeModal()
    console.log('formRes', formRes)
  } else {
    setSubLoading(false)
  }
}

defineExpose({
  openModal
})
</script>
