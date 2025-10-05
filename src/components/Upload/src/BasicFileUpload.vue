<template>
  <div class="w-full">
    <!-- 上传区域 -->
    <input type="file" multiple @change="handleFileSelect" class="mb-3" />

    <!-- 文件列表 -->
    <div v-if="fileList.length" class="space-y-2">
      <div
        v-for="(file, index) in fileList"
        :key="index"
        class="flex items-center justify-between p-2 border rounded"
      >
        <span class="text-sm truncate">{{ file.name }}</span>
        <div>
          <button v-if="isImage(file)" @click="preview(file)" class="text-blue-500 mr-2 text-sm">
            预览
          </button>
          <button @click="remove(index)" class="text-red-500 text-sm">删除</button>
        </div>
      </div>
    </div>

    <!-- 预览弹窗 -->
    <div
      v-if="previewUrl"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-4 rounded">
        <button @click="previewUrl = ''" class="float-right">✕</button>
        <img :src="previewUrl" class="max-w-[80vw] max-h-[80vh]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileList = ref<File[]>([])
const previewUrl = ref('')

function isImage(file: File): boolean {
  return file.type.startsWith('image/')
}

function handleFileSelect(e: Event) {
  const input = e.target as HTMLInputElement
  if (input.files) {
    fileList.value.push(...Array.from(input.files))
  }
}

function preview(file: File) {
  previewUrl.value = URL.createObjectURL(file)
}

function remove(index: number) {
  fileList.value.splice(index, 1)
}

// 如果你需要把 fileList 暴露给父组件
defineExpose({ fileList })
</script>
