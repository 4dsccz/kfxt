<template>
  <div class="emr-editor-container">
    <div class="toolbar">
      <button @click="loadTemplate">加载病历模板</button>
      <button @click="getStructuredData">获取结构化数据</button>
      <button @click="getContent">获取HTML内容</button>
      <button @click="clearEditor">清空</button>
    </div>

    <!-- SoDiaoEditor 挂载点 -->
    <div
      id="sde-editor"
      ref="editorRef"
      style="height: 600px; border: 1px solid #ddd; margin-top: 10px"
    ></div>

    <!-- 调试输出区 -->
    <div v-if="debugData" class="debug-output">
      <h4>调试信息：</h4>
      <pre>{{ debugData }}</pre>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const editorRef = ref(null)
let sdeEditor = null
const debugData = ref(null)

// 模拟一个从后端获取的病历模板（实际项目中应为 DOCX 转换后的 HTML）
const sampleTemplate = `
  <h2>入院记录</h2>
  <p>姓名：<span class="sde-field" data-key="patientName" contenteditable="false">张三</span></p>
  <p>性别：<span class="sde-field" data-key="gender" contenteditable="false">男</span></p>
  <p>主诉：<span class="sde-field" data-key="chiefComplaint" contenteditable="true">反复咳嗽3天</span></p>
  <table border="1">
    <tr><td>体温</td><td><span class="sde-field" data-key="temp" contenteditable="true">36.5</span>℃</td></tr>
  </table>
`

// 动态加载 SoDiaoEditor 脚本（避免打包进 bundle）
const loadSdeScript = () => {
  return new Promise((resolve, reject) => {
    if (window.SDEditor) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = '/sde/sde.editor.js'
    script.onload = () => resolve()
    script.onerror = reject
    document.head.appendChild(script)

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/sde/sde.editor.css'
    document.head.appendChild(link)
  })
}

// 初始化编辑器
const initEditor = async () => {
  await loadSdeScript()

  if (!editorRef.value) return

  // 销毁已有实例（防止重复初始化）
  if (sdeEditor) {
    sdeEditor.destroy()
  }

  // 创建新实例
  sdeEditor = new window.SDEditor({
    el: editorRef.value,
    // 可选配置
    config: {
      height: 600,
      width: '100%',
      readonly: false,
      placeholder: '请输入病历内容...',
      // 如果你的 SDE 支持字段识别，可开启
      enableField: true
    }
  })
}

// 加载模板
const loadTemplate = () => {
  if (!sdeEditor) return
  sdeEditor.setContent(sampleTemplate)
}

// 获取结构化数据（需 SDE 支持字段解析）
const getStructuredData = () => {
  if (!sdeEditor) return

  // 方法1：如果 SDE 提供 getFields() API
  if (typeof sdeEditor.getFields === 'function') {
    const fields = sdeEditor.getFields()
    debugData.value = JSON.stringify(fields, null, 2)
    return
  }

  // 方法2：手动解析（备用）
  const html = sdeEditor.getContent()
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const fieldEls = doc.querySelectorAll('.sde-field[data-key]')
  const data = {}
  fieldEls.forEach(el => {
    const key = el.getAttribute('data-key')
    const value = el.textContent || ''
    data[key] = value
  })
  debugData.value = JSON.stringify(data, null, 2)
}

// 获取原始 HTML
const getContent = () => {
  if (!sdeEditor) return
  const html = sdeEditor.getContent()
  debugData.value = html
}

// 清空
const clearEditor = () => {
  if (sdeEditor) {
    sdeEditor.setContent('')
  }
}

// 生命周期
onMounted(() => {
  initEditor()
})

onBeforeUnmount(() => {
  if (sdeEditor) {
    sdeEditor.destroy()
    sdeEditor = null
  }
})
</script>

<style scoped>
.emr-editor-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.toolbar {
  margin-bottom: 10px;
}

.toolbar button {
  margin-right: 8px;
  padding: 6px 12px;
  cursor: pointer;
}

.debug-output {
  margin-top: 20px;
  padding: 10px;
  background: #f5f5f5;
  border: 1px solid #eee;
  border-radius: 4px;
  white-space: pre-wrap;
  font-family: monospace;
  font-size: 12px;
}
</style>
