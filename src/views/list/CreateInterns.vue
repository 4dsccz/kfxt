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
    field: 'YSBM',
    component: 'NInput',
    label: '编码',
    componentProps: {
      placeholder: '请输入编码'
    }
  },
  {
    field: 'YSXM',
    component: 'NInput',
    label: '姓名',
    componentProps: {
      placeholder: '请输入姓名'
    },
    rules: [{ required: true, message: '请输入姓名', trigger: ['blur'] }]
  },
  {
    field: 'XB',
    component: 'NRadioGroup',
    label: '性别',
    componentProps: {
      options: [
        { label: '男', value: 1 },
        { label: '女', value: 2 }
      ]
    }
  },
  {
    field: 'CSRQ',
    component: 'NDatePicker',
    label: '出生日期',
    componentProps: {
      type: 'date',
      clearable: true,
      placeholder: '请选择出生日期'
    }
  },
  {
    field: 'JDXX',
    component: 'NInput',
    label: '就读学校',
    componentProps: {
      placeholder: '请输入就读学校'
    }
  },
  {
    field: 'ZDLS',
    component: 'NInput',
    label: '指导老师',
    componentProps: {
      placeholder: '请输入指导老师'
    }
  },
  {
    field: 'LXDH',
    component: 'NInput',
    label: '联系电话',
    componentProps: {
      placeholder: '请输入联系电话',
      type: 'tel'
    }
  },
  {
    field: 'JTDZ',
    component: 'NInput',
    label: '家庭地址',
    componentProps: {
      placeholder: '请输入家庭地址'
    }
  },
  {
    field: 'LRRQ',
    component: 'NDatePicker',
    label: '来院日期',
    componentProps: {
      type: 'date',
      clearable: true,
      placeholder: '请选择来院日期'
    },
    rules: [{ required: true, message: '请选择来院日期', trigger: ['blur', 'change'] }]
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
  title: '新增实习生',
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
