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
    field: 'KSDM',
    component: 'NInput',
    label: '科室代码',
    componentProps: {
      placeholder: '请输入科室代码'
    },
    rules: [{ required: true, message: '请输入科室代码', trigger: ['blur'] }]
  },
  {
    field: 'KSMC',
    component: 'NInput',
    label: '科室名称',
    componentProps: {
      placeholder: '请输入科室名称'
    },
    rules: [{ required: true, message: '请输入科室名称', trigger: ['blur'] }]
  },
  {
    field: 'YB_KSDM',
    component: 'NInput',
    label: '医保代码',
    componentProps: {
      placeholder: '请输入医保代码'
    }
  },
  {
    field: 'HIS_KSDM',
    component: 'NInput',
    label: 'HIS科室代码',
    componentProps: {
      placeholder: '请输入HIS科室代码'
    }
  },
  {
    field: 'note',
    component: 'NInput',
    label: '备注',
    componentProps: {
      placeholder: '请输入备注'
    }
  },
  {
    field: 'mzy',
    component: 'NRadioGroup',
    label: '门住院',
    componentProps: {
      options: [
        { label: '门诊', value: 1 },
        { label: '住院', value: 2 }
      ]
    },
    rules: [{ required: true, message: '请选择门住院类型', trigger: ['change'] }]
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
  title: '新增科室',
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
