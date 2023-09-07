# Vue 3 + TypeScript + uni-cli
# 克隆项目
```
git clone http://gitlab.yuepong.cn/front-end/yp-uniapp-ui.git
```

# 进入项目目录
```
cd uni-preset-vue
```

# 安装依赖
```
npm install
```

# 项目启动

## 启动微信小程序服务 

```
npm run dev:mp-weixin
```

## 启动飞书小程序服务 

```
npm run dev:mp-lark
```

**推荐vscode编辑器打开**

服务启动之后手动用各家小程序开发工具打开 **`/dist/dev/`**目录下的项目

**也适用于在Hbuilder运行到各家小程序模拟器**

# 项目结构

```js
    /
    |---- /.hbuilderx   
    |---- /dist         
    |---- /public      
    |---- /pages
    |---- /src
          |---- /api  			网络请求
          |---- /common			公共方法
          |---- /component       公共组件
          |---- /pages           页面
          |---- /static          静态资源
          |---- /store           Pinia
          |---- App.vue          根组件
          |---- config.ts        项目配置文件
          |---- main.ts          入口
          |---- manifest.json    uniapp 配置文件
          |---- pages.json       页面配置
          |---- theme.json       主题色配置 深色/浅色
          |---- uni.scss         内置 scss 变量
    |---- .gitignore
    |---- index.html
    |---- package.json
    |---- .eslintrc.js           代码风格
    |---- .prettierrc            代码风格
    |---- package-lock.json
    |---- README.md
    |---- vite.config.ts
    |---- tsconfig.json
	
// components 下的组件配置了自动导入  文件命名格式yp-xxx   如：yp-button
```

# 基础功能

### 加载

```vue
<template>
  <view class="content">
    <u-button type="primary" size="small" @click="openLaod">加载</u-button>
    <yp-loading ref="loading" />
  </view>
</template>

<script setup lang="ts">
import ypLoading from '@/components/yp-loading/index.vue'

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
```

### 二维码

```vue
<template>
  <view class="content">
    <u-button type="primary" size="small" @click="createQrCode">二维码</u-button>
    <yp-qrcode :height="200" :width="200" :show="qrcodeVisible" ref="qrcode" />
  </view>
</template>

<script setup lang="ts">
import ypQrcode from '@/components/yp-qrcode/index.vue'

// 二维码
const qrCodeHook = () => {
  const qrcodeVisible = ref(false) // 控制二维码是否显示
  const qrcode = ref<InstanceType<typeof ypQrcode>>()
  const text = 'one more time' // 要生成二维码的内容
  const createQrCode = () => {
    qrcode.value?.createQrcode(text)
    qrcodeVisible.value = true
  }
  return { qrcodeVisible, qrcode, createQrCode }
}
const { qrcodeVisible, qrcode, createQrCode } = qrCodeHook()
</script>
```

### 文件下载

```vue
<template>
    <yp-download :url="url" :headers="headers">
        <u-button type="primary" size="small">文件下载</u-button>
    </yp-download>
</template>
<script setup lang="ts">
// 文件下载
const fileHook = () => {
  const url = 'https://www.yuepong.cn/test/com/api-gateway/sale-service/api/v3.0.3/giftCardSells/download'
  const headers = reactive({
    Authorization: 'bearer TkH14XVbhEAD5ZXbs9aJ7oq5FOzrcuiwyOOh6MDzO9Q='
  })
  return { url, headers }
}
const { url, headers } = fileHook()
</script>
```

### 文件上传

```vue
<template>
    <yp-upload @success="successUplod" @handleDel="handleDelFile" />
</template>
<script setup lang="ts">
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
</script>
```

### 图片选择/上传

* maxImageNum 最大选择数量
* deletable 图片是否可删除

```vue
<template>
    <yp-choose-img :maxImageNum="9" :deletable="false" />
</template>
```

### 拨打电话

```vue
<template>
    <yp-phone phone="13546175424" />
</template>
```



### 计算器

```vue
<template>
  <view class="content">
    <u-button @click="show">计算器</u-button>
    <yp-calculator :show="calculatorVisuble" @close="close" @success="success" />
  </view>
</template>

<script setup lang="ts">


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
</script>

<style lang="scss" scoped></style>

```



### 位置选择 示例

```vue
<script setup lang="ts">
const getLocation = () => {
  uni.chooseLocation({
    success(res) {
      console.log(res)
    }
  })
}
</script>
```

需要申请开通`wx.chooseLocation`并在`manifest.json`配置

```json
  "mp-weixin": {
    "appid": "wx2c53cef35b10d437", 
    "requiredPrivateInfos": ["chooseLocation"], // 添加这一行，其他位置通过申请后同样在这里添加
    "darkmode": true,
    "themeLocation": "theme.json"
  },
```

### 主题色

**默认**开启了系统深色模式，可在`manifest.json`关闭

```json
"mp-weixin": {
    "appid": "wx2c53cef35b10d437", 
    "darkmode": true, // 适配系统主题 true 开启 false 关闭
    "themeLocation": "theme.json" // 用于颜色主题相关的变量定义
  },
```
