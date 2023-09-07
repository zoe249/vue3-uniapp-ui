<template>
  <view class="content">
    <view class="qr-box">
      <!-- <canvas
        v-if="props.type === 'canvas'"
        canvas-id="qrcode"
        v-show="show"
        style="width: 300rpx; margin: 0 auto"
      /> -->
      <image :src="qrUrl" v-show="show" :style="`height: ${height}rpx; width: ${width}rpx;`" />
    </view>
  </view>
</template>

<script lang="ts" setup>
// import uQRCode from '@/common/qrcode/uqrcode.js'
import createQrCodeImg from '@/common/qrcode/qrcode.js'
const props = defineProps({
  // 是否显示二维码
  show: {
    type: Boolean,
    default: false
  },
  // 高度
  height: {
    type: Number,
    default: 300
  },
  // 宽度
  width: {
    type: Number,
    default: 300
  }
})

const emits = defineEmits(['success'])
const qrUrl = ref('')

/**
 * 生成二维码
 * @param {string} text 要生成的二维码内容
 */
const createQrcode = (text: string) => {
  qrUrl.value = createQrCodeImg(text)
}
defineExpose({ createQrcode })
</script>

<style>
.qr-box {
  width: 400rpx;
  height: 460rpx;
  margin: 0 auto;
}
</style>
