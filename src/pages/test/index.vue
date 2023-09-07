<template>
  <view class="content">
    <u-button type="primary" size="small" @click="openLaod">打开加载</u-button>
    <u-button type="primary" size="small" @click="closeLoad">关闭加载</u-button>

    <u-button type="primary" size="small" @click="createQrCode">二维码</u-button>

    <yp-download :url="url" :headers="headers">
      <u-button type="primary" size="small">文件下载</u-button>
    </yp-download>

    <u-button @click="show">计算器</u-button>

    <yp-upload @success="successUplod" @handleDel="handleDelFile" />

    <yp-choose-img :maxImageNum="8" :deletable="false" />

    <yp-calculator :show="calculatorVisuble" @close="close" @success="success" />

    <yp-phone phone="13546175424" />

    <view>{{ userStore.name }}</view>
    <u-button type="primary" size="small" @click="updateName">改名</u-button>
    <u-button type="primary" size="small" @click="getLocation">获取位置</u-button>
    <yp-loading ref="loading" />
    <yp-qrcode :height="200" :width="200" :show="qrcodeVisible" ref="qrcode" />
  </view>
</template>

<script setup lang="ts">
import { onLoad, onShow } from '@dcloudio/uni-app'
import ypLoading from '@/components/yp-loading/index.vue'
import ypQrcode from '@/components/yp-qrcode/index.vue'
import useUserStore from '@/store/module/user'
const userStore = useUserStore()

onLoad((options) => {
  console.log(options)
})

const updateName = () => {
  userStore.updateName('陆小果')
}

// 加载
const loadHook = () => {
  const loading = ref<InstanceType<typeof ypLoading>>()
  const openLaod = () => {
    loading.value?.open()
  }
  const closeLoad = () => {
    loading.value?.close(true)
  }
  return { loading, openLaod, closeLoad }
}
const { loading, openLaod, closeLoad } = loadHook()

// 二维码
const qrCodeHook = () => {
  const qrcodeVisible = ref(false)
  const qrcode = ref<InstanceType<typeof ypQrcode>>()
  const text = 'one more time' // 要生成二维码的内容
  const createQrCode = () => {
    qrcode.value?.createQrcode(text)
    qrcodeVisible.value = true
  }

  return { qrcodeVisible, qrcode, createQrCode }
}
const { qrcodeVisible, qrcode, createQrCode } = qrCodeHook()

// 上传文件
const upLoadHook = () => {
  const successUplod = (file: any) => {
    console.log('上传了文件', file)
  }
  const handleDelFile = () => {
    console.log('删除了一个文件')
  }
  return { successUplod, handleDelFile }
}
const { successUplod, handleDelFile } = upLoadHook()

// 文件下载
const fileHook = () => {
  const url = 'https://www.yuepong.cn/test/com/api-gateway/sale-service/api/v3.0.3/giftCardSells/download'
  const headers = reactive({
    Authorization: 'bearer TkH14XVbhEAD5ZXbs9aJ7oq5FOzrcuiwyOOh6MDzO9Q='
  })
  return { url, headers }
}
const { url, headers } = fileHook()

// 计算器
const calculatorHook = () => {
  const calculatorVisuble = ref(false)
  const show = () => {
    calculatorVisuble.value = true
  }
  const close = () => {
    calculatorVisuble.value = false
  }
  const success = (count: string) => {
    console.log('计算结果', count)
  }

  return { calculatorVisuble, show, close, success }
}
const { calculatorVisuble, show, close, success } = calculatorHook()

const getLocation = () => {
  uni.chooseLocation({
    success(res) {
      console.log(res)
    }
  })
}
</script>

<style lang="scss" scoped></style>
