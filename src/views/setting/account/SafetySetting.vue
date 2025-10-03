<template>
  <n-grid cols="1" responsive="screen" class="-mt-4">
    <n-grid-item>
      <n-list>
        <n-list-item>
          <template #suffix>
            <n-button type="primary" text @click="showModal = true">修改</n-button>
          </template>
          <n-thing title="账户密码">
            <template #description>
              <span class="text-gray-400">绑定手机和邮箱，并设置密码，帐号更安全</span>
            </template>
          </n-thing>
        </n-list-item>

        <!-- 其他项暂时注释 -->
        <!--
        <n-list-item>
          <template #suffix>
            <n-button type="primary" text>修改</n-button>
          </template>
          <n-thing title="绑定手机">
            <template #description>
              <span class="text-gray-400">已绑定手机号：+86189****4877</span>
            </template>
          </n-thing>
        </n-list-item>
        <n-list-item>
          <template #suffix>
            <n-button type="primary" text>设置</n-button>
          </template>
          <n-thing title="密保问题">
            <template #description>
              <span class="text-gray-400">未设置密保问题，密保问题可有效保护账户安全</span>
            </template>
          </n-thing>
        </n-list-item>
        <n-list-item>
          <template #suffix>
            <n-button type="primary" text>修改</n-button>
          </template>
          <n-thing title="个性域名">
            <template #description>
              <span class="text-gray-400">已绑定域名：https://www.naiveui.com</span>
            </template>
          </n-thing>
        </n-list-item>
        -->
      </n-list>
    </n-grid-item>
  </n-grid>

  <!-- 修改密码弹窗 -->
  <n-modal v-model:show="showModal" preset="dialog" title="修改密码" :mask-closable="false">
    <n-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-placement="left"
      label-width="80"
      @submit="handleSubmit"
    >
      <n-form-item label="用户工号">
        <n-input v-model:value="form.Opcode" type="text" readonly />
        <n-input v-model:value="form.Opname" type="text" readonly />
      </n-form-item>
      <n-form-item label="原密码" path="oldPassword">
        <n-input
          v-model:value="form.oldPassword"
          type="password"
          show-password-on="mousedown"
          placeholder="请输入原密码"
        />
      </n-form-item>
      <n-form-item label="新密码" path="newPassword">
        <n-input
          v-model:value="form.newPassword"
          type="password"
          show-password-on="mousedown"
          placeholder="请输入新密码"
          @input="clearConfirm"
        />
      </n-form-item>
      <n-form-item label="确认密码" path="confirmPassword">
        <n-input
          v-model:value="form.confirmPassword"
          type="password"
          show-password-on="mousedown"
          placeholder="请再次输入新密码"
        />
      </n-form-item>
    </n-form>

    <template #action>
      <n-button @click="showModal = false">取消</n-button>
      <n-button type="primary" @click="handleSubmit">确定</n-button>
    </template>
  </n-modal>
</template>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import { reactive, ref } from 'vue'

const message = useMessage()

const showModal = ref(false)

const form = reactive({
  Opcode: '',
  Opname: '',
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const formRef = ref()

// 清空确认密码（当新密码改变时）
const clearConfirm = () => {
  form.confirmPassword = ''
  if (formRef.value) {
    formRef.value.restoreValidation(['confirmPassword'])
  }
}

// 表单校验规则
const rules = {
  oldPassword: {
    required: true,
    message: '请输入原密码',
    trigger: 'blur'
  },
  newPassword: {
    required: true,
    message: '请输入新密码',
    trigger: 'blur'
  },
  confirmPassword: {
    required: true,
    validator(rule: any, value: string) {
      if (!value) {
        return new Error('请确认新密码')
      } else if (value !== form.newPassword) {
        return new Error('两次输入的密码不一致')
      }
      return true
    },
    trigger: 'blur'
  }
}

// 提交修改密码
const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    // TODO: 调用真实 API 修改密码
    console.log('提交密码修改:', form)

    message.success('密码修改成功！')
    showModal.value = false

    // 重置表单
    form.oldPassword = ''
    form.newPassword = ''
    form.confirmPassword = ''
  } catch (error) {
    message.error('请检查输入内容')
  }
}
</script>
