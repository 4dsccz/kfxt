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
    field: 'Opcode',
    component: 'NInput',
    label: '登录账号',
    componentProps: {
      placeholder: '请输入登录账号'
    },
    rules: [{ required: true, message: '请输入登录账号', trigger: ['blur'] }]
  },
  {
    field: 'Opname',
    component: 'NInput',
    label: '用户姓名',
    componentProps: {
      placeholder: '请输入用户姓名'
    },
    rules: [{ required: true, message: '请输入用户姓名', trigger: ['blur'] }]
  },
  {
    field: 'sex',
    component: 'NRadioGroup',
    label: '性别',
    componentProps: {
      options: [
        { label: '男', value: '男' },
        { label: '女', value: '女' }
      ]
    }
  },
  {
    field: 'tel',
    component: 'NInput',
    label: '联系方式',
    componentProps: {
      placeholder: '请输入手机号码',
      type: 'tel'
    },
    rules: [
      { required: true, message: '请输入联系方式', trigger: ['blur'] },
      { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: ['blur'] }
    ]
  },
  {
    field: 'email',
    component: 'NInput',
    label: '邮箱',
    componentProps: {
      placeholder: '请输入邮箱',
      type: 'email'
    },
    rules: [
      {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: '邮箱格式不正确',
        trigger: ['blur']
      }
    ]
  },
  {
    field: 'Is_valid',
    component: 'NSwitch',
    label: '状态',
    componentProps: {
      checkedText: '启用',
      uncheckedText: '禁用'
    },
    defaultValue: 1 // 默认启用（根据你的 validMap，1=启用）
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
  title: '新增角色',
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
