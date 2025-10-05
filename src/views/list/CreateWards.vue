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
    field: 'BQDM',
    component: 'NInput',
    label: '病区代码',
    componentProps: {
      placeholder: '请输入病区代码'
    },
    rules: [{ required: true, message: '请输入病区代码', trigger: ['blur'] }]
  },
  {
    field: 'BQMC',
    component: 'NInput',
    label: '病区名称',
    componentProps: {
      placeholder: '请输入病区名称'
    },
    rules: [{ required: true, message: '请输入病区名称', trigger: ['blur'] }]
  },
  {
    field: 'KSDM',
    component: 'NInput',
    label: '对应科室代码',
    componentProps: {
      placeholder: '请输入对应科室代码'
    }
  },
  {
    field: 'HIS_BQDM',
    component: 'NInput',
    label: 'HIS病区代码',
    componentProps: {
      placeholder: '请输入HIS病区代码'
    }
  },
  {
    field: 'note',
    component: 'NInput',
    label: '备注',
    componentProps: {
      placeholder: '请输入备注',
      type: 'textarea'
    }
  },
  {
    field: 'is_valid',
    component: 'NSwitch',
    label: '状态',
    componentProps: {
      checkedText: '启用',
      uncheckedText: '禁用'
    },
    defaultValue: 1
  }
]

const [registerForm, { submit }] = useForm({
  gridProps: { cols: 1 },
  collapsedRows: 3,
  labelWidth: 100,
  layout: 'horizontal',
  submitButtonText: '保存',
  showActionButtonGroup: false,
  schemas
})

const [modalRegister, { openModal, closeModal, setSubLoading }] = useModal({
  title: '新增病区',
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
