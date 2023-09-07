<template>
  <view class="content">
    <!-- <text>照片不能超过{{ maxImageNum }}张:</text> -->
    <view class="image-wrap">
      <view class="image-content" v-for="(item, index) in imageArr" :key="index">
        <image :src="item" @click="previewUpImg(index)"></image>
        <view class="del" @click="deleteUpImg(index)">
          <image src="@/static/default/del-small.png" />
        </view>
      </view>
    </view>

    <!--上传的按钮显示-->
    <view class="up-btn-view">
      <view class="up-btn" v-if="imageArr.length < maxImageNum" @click="chooseImage">
        <image src="@/static/default/add.png" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  //最大可支持的图片数量
  maxImageNum: {
    type: Number,
    default: 8
  },
  // 图片是否可删除
  deletable: {
    type: Boolean,
    defult: true
  }
})

const imageArr = ref<Array<any>>([])
/**
 * 选择图片
 */
const chooseImage = () => {
  uni.chooseImage({
    count: props.maxImageNum, // 最大上传数量
    success(res: any) {
      if ([...imageArr.value, ...res.tempFilePaths].length > 8) {
        imageArr.value = [...imageArr.value, ...res.tempFilePaths].splice(0, props.maxImageNum)
      } else {
        imageArr.value = [...imageArr.value, ...res.tempFilePaths]
      }

      // console.log(res.tempFilePaths)
    }
  })
}

/**
 * 预览图片
 */
const previewUpImg = (index: number) => {
  uni.previewImage({
    urls: imageArr.value,
    current: index
  })
}

/**
 * 删除图片
 */
const deleteUpImg = (index: number) => {
  imageArr.value.splice(index, 1)
}
</script>

<style lang="scss" scoped>
.image-wrap {
  width: 750rpx;
  display: flex;
  flex-wrap: wrap;
  .image-content {
    position: relative;
    width: 150rpx;
    height: 150rpx;
    margin: 20rpx 15rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .del {
    position: absolute;
    width: 30upx;
    height: 30upx;
    top: -15upx;
    right: -10upx;
    image {
      width: 100%;
      height: 100%;
    }
  }
}

.up-btn-view {
  .up-btn {
    width: 120rpx;
    height: 120rpx;
    background-color: #dcd9d9;
    display: flex;
    justify-content: center;
    align-items: center;
    image {
      width: 50rpx;
      height: 50rpx;
    }
  }
}
</style>
