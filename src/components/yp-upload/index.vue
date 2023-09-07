<!--
  文件上传 
  支持微信、飞书小程序 
  最大上传数量1
-->
<template>
  <view class="content">
    <view class="wrap" @click="ypUploadFile">
      <span class="iconfont icon-tianjia1"></span>
    </view>
    <view class="text" :class="customStyle" v-for="(item, index) in files" :key="item.name">
      <view class="text-name">
        <span class="iconfont icon-sunhao"></span>
        <span>{{ item.name }}</span>
      </view>
      <view class="text-icon" @click="handleDel(index)">
        <span class="iconfont icon-chahao"></span>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const emits = defineEmits(['success', 'handleDel'])
const files = ref<Array<any>>()
const customStyle = ref('')

/**
 * 删除文件
 */
const handleDel = (index: number) => {
  customStyle.value = 'animate'
  setTimeout(() => {
    files.value?.splice(index, 1)
    customStyle.value = ''
    emits('handleDel')
  }, 500)
}

/**
 * 上传文件
 */
const ypUploadFile = () => {
  // #ifdef MP-WEIXIN
  wx.chooseMessageFile({
    count: 1,
    type: 'all'
  })
    .then((res: any) => {
      files.value = res.tempFiles
      emits('success', res.tempFiles[0])
    })
    .catch((err: any) => {
      console.log(err)
    })
  // #endif
  // #ifdef MP-LARK
  tt.filePicker({
    maxNum: 1,
    success(res: any) {
      files.value = res.list
      emits('success', res.list[0])
    },
    fail(res: any) {
      console.log(`filePicker fail: ${JSON.stringify(res)}`)
    }
  })
  // #endif
}
defineExpose({ ypUploadFile })
</script>

<style lang="scss" scoped>
.content {
  .wrap {
    height: 200rpx;
    width: 200rpx;
    background-color: $system-bg-light;
    color: $system-text-light;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .text {
    display: flex;
    justify-content: space-between;
    margin-top: 10rpx;
    font-size: 26rpx;
    color: #909399;
    .text-icon {
      color: $uni-color-error;
    }
  }
}

.animate {
  animation: animate 0.5s ease-in 1;
}

@keyframes animate {
  0% {
    transform: translateY(0rpx);
    opacity: 1;
  }
  100% {
    transform: translateY(-60rpx);
    opacity: 0;
  }
}
</style>
