<template>
  <div class="w-full">
    <div class="upload">
      <div class="upload-card">
        <!-- 文件列表 -->
        <div
          class="upload-card-item"
          :style="getCSSProperties"
          v-for="(item, index) in imgList"
          :key="`file_${index}`"
        >
          <div class="upload-card-item-info">
            <div class="file-box">
              <n-icon size="24" class="file-icon">
                <FileOutlined />
              </n-icon>
              <div class="file-name">{{ getFileNameFromUrl(item) }}</div>
            </div>
            <div class="img-box-actions">
              <n-icon size="18" class="mx-2 action-icon" @click="download(item)">
                <DownloadOutlined />
              </n-icon>
              <n-icon size="18" class="mx-2 action-icon" @click="remove(index)">
                <DeleteOutlined />
              </n-icon>
            </div>
          </div>
        </div>

        <!-- 上传区域 -->
        <div
          class="upload-card-item upload-card-item-select-picture"
          :style="getCSSProperties"
          v-if="imgList.length < maxNumber"
        >
          <n-upload
            class="w-auto"
            v-bind="$props"
            :file-list-style="{ display: 'none' }"
            @before-upload="beforeUpload"
            @finish="finish"
          >
            <div class="flex flex-col justify-center">
              <n-icon size="18" class="m-auto">
                <PlusOutlined />
              </n-icon>
              <span class="upload-title">上传文件</span>
            </div>
          </n-upload>
        </div>
      </div>
    </div>

    <n-space>
      <n-alert title="提示" type="info" v-if="helpText" class="flex w-full">
        {{ helpText }}
      </n-alert>
    </n-space>
  </div>
</template>

<script lang="ts">
import { ResultEnum } from '@/enums/httpEnum'
import { useGlobSetting } from '@/hooks/setting'
import componentSetting from '@/settings/componentSetting'
import { isString } from '@/utils/is'
import { DeleteOutlined, DownloadOutlined, FileOutlined, PlusOutlined } from '@vicons/antd'
import { useDialog, useMessage } from 'naive-ui'
import { computed, defineComponent, reactive, toRefs, watch } from 'vue'
import { basicProps } from './props'

const globSetting = useGlobSetting()

export default defineComponent({
  name: 'BasicUpload',

  components: { DeleteOutlined, DownloadOutlined, FileOutlined, PlusOutlined },
  props: {
    ...basicProps
  },
  emits: ['uploadChange', 'delete'],
  setup(props, { emit }) {
    const getCSSProperties = computed(() => {
      return {
        width: `${props.width}px`,
        height: `${props.height}px`
      }
    })

    const message = useMessage()
    const dialog = useDialog()

    const state = reactive({
      imgList: [] as string[] // 仍叫 imgList，但实际存文件 URL
    })

    // 赋值默认文件显示
    watch(
      () => props.value,
      () => {
        state.imgList = props.value.map(item => {
          return getFullUrl(item)
        })
      },
      { immediate: true }
    )

    // 获取完整 URL
    function getFullUrl(url: string): string {
      const { imgUrl } = globSetting
      return /(^http|https:\/\/)/g.test(url) ? url : `${imgUrl}${url}`
    }

    // 从 URL 提取文件名
    function getFileNameFromUrl(url: string): string {
      try {
        const name = url.split('/').pop() || url
        return name.length > 20 ? name.substring(0, 18) + '...' : name
      } catch {
        return url
      }
    }

    // 下载文件
    function download(url: string) {
      const a = document.createElement('a')
      a.href = url
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
      a.click()
    }

    // 删除
    function remove(index: number) {
      dialog.info({
        title: '提示',
        content: '你确定要删除吗？',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
          state.imgList.splice(index, 1)
          const originalList = state.imgList.map(item => {
            return item.replace(globSetting.imgUrl, '')
          })
          emit('uploadChange', originalList)
          emit('delete', originalList)
        }
      })
    }

    // 删除原来的 checkFileType 函数

    // 替换 beforeUpload 为以下内容
    function beforeUpload({ file }) {
      const fileInfo = file.file
      const { maxSize, accept } = props

      // 1. 检查大小
      if (maxSize && fileInfo.size / 1024 / 1024 >= maxSize) {
        message.error(`上传文件最大值不能超过${maxSize}M`)
        return false
      }

      // 2. 检查文件扩展名（支持 .pdf, .docx 等）
      if (accept) {
        const acceptList = (isString(accept) ? accept.split(',') : accept).map(ext =>
          ext.trim().toLowerCase()
        )
        const fileName = fileInfo.name.toLowerCase()
        const isValid = acceptList.some(ext => {
          if (ext.startsWith('.')) {
            return fileName.endsWith(ext)
          }
          // 如果是 MIME 类型（如 application/pdf），也可支持，但通常 accept 传扩展名更直观
          return fileInfo.type === ext
        })

        if (!isValid) {
          message.error(`仅支持以下格式：${acceptList.join(', ')}`)
          return false
        }
      }

      return true
    }

    // 上传结束
    function finish({ event: Event }) {
      const res = JSON.parse(Event.target.response) // 安全替代 eval
      const infoField = componentSetting.upload.apiSetting.infoField
      const { code } = res
      const msg = res.msg || res.message || '上传失败'
      const result = res[infoField]

      if (code === ResultEnum.SUCCESS) {
        const fileUrl = getFullUrl(result.photo || result.url || result)
        state.imgList.push(fileUrl)
        const originalList = state.imgList.map(item => item.replace(globSetting.imgUrl, ''))
        emit('uploadChange', originalList)
      } else {
        message.error(msg)
      }
    }

    return {
      ...toRefs(state),
      finish,
      download,
      remove,
      beforeUpload,
      getCSSProperties,
      getFileNameFromUrl
    }
  }
})
</script>

<style lang="less">
.upload {
  width: 100%;
  overflow: hidden;

  &-card {
    width: auto;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    &-item {
      margin: 0 8px 8px 0;
      position: relative;
      padding: 8px;
      border: 1px solid #d9d9d9;
      border-radius: 2px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;

      &:hover {
        background: 0 0;

        .upload-card-item-info::before {
          opacity: 1;
        }
      }

      &-info {
        position: relative;
        height: 100%;
        width: 100%;
        padding: 0;
        overflow: hidden;

        &:hover {
          .img-box-actions {
            opacity: 1;
          }
        }

        &::before {
          position: absolute;
          z-index: 1;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          opacity: 0;
          transition: all 0.3s;
          content: ' ';
        }

        .file-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;

          .file-icon {
            color: #1890ff;
            margin-bottom: 4px;
          }

          .file-name {
            font-size: 12px;
            color: #333;
            word-break: break-all;
          }
        }
      }

      .img-box-actions {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 10;
        white-space: nowrap;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .action-icon {
          color: rgba(255, 255, 255, 0.85);

          &:hover {
            cursor: pointer;
            color: #fff;
          }
        }
      }
    }

    &-item-select-picture {
      border: 1px dashed #d9d9d9;
      border-radius: 4px; // 稍圆一点
      cursor: pointer;
      background: #f5f5f5; // 稍深一点的背景
      color: #666;
      display: flex;
      justify-content: center;
      align-items: center;

      .upload-title {
        color: #666;
        font-size: 12px;
        margin-top: 4px;
      }
    }
  }
}
</style>
