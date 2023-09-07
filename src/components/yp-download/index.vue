<template>
  <view class="content" @click="download">
    <slot>
      <u-button type="primary" size="small">文件下载</u-button>
    </slot>
  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  url: {
    type: String,
    required: true
  },
  headers: {
    type: Object,
    default: () => {}
  }
})

const download = () => {
  uni.downloadFile({
    url: props.url,
    header: {
      ...props.headers
    },
    success(res) {
      // 打开文件
      uni.openDocument({
        filePath: res.tempFilePath,
        showMenu: true,
        success: function (res) {
          console.log('打开文档成功')
        }
      })
    }
  })
}
</script>

<style lang="scss" scoped></style>
