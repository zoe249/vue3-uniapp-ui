<!-- 
组件用法：

	<loading 
	    ref="loading"
	    :custom="false"
	    :shadeClick="true"
	    :type="1"
	    @callback="callback()">
	    <view class="test">自定义</view>
	</loading>
	
	js
	close:function(){
	    loading.value.close();
	},
	open:function(){
	    loading.value.open();
	},
	callback(){
	    console.log("回掉");
	}
 
 -->

<template>
  <view v-show="isPopup" class="loading-popup">
    <view v-show="shadeShow" class="shade-popup" :class="[ani]" @click="close(shadeClick)"></view>
    <view
      class="loading-content"
      :class="[ani]"
      :style="{ height: height, width: width, backgroundColor: backgroundColor }"
    >
      <slot></slot>
      <view class="circle-loading" v-if="!custom && type == 1">
        <view class="dot">
          <view class="first-dot"></view>
        </view>
        <view class="dot"></view>
        <view class="dot"></view>
        <view class="dot"></view>
      </view>
      <view class="rectangle-loading" v-if="!custom && type == 2">
        <view class="dot"></view>
        <view class="dot"></view>
        <view class="dot"></view>
        <view class="dot"></view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
const props = defineProps({
  shadeShow: {
    // 遮罩层
    value: Boolean,
    default: false
  },
  shadeClick: {
    // 遮罩层是否可点击
    value: Boolean,
    default: true
  },
  custom: {
    // 是否自定义内容
    value: Boolean,
    default: false
  },
  type: {
    // 1：圆圈加载。2：矩形加载
    value: Number as PropType<1 | 2>,
    default: 1
  },
  width: {
    // 宽度
    value: String,
    default: '200rpx'
  },
  height: {
    // 高度
    value: String,
    default: '200rpx'
  },
  backgroundColor: {
    // 弹出框框背景色
    value: String,
    default: '#fff'
  },
  callback: {
    // 关闭后回调函数
    type: Function,
    default: function () {}
  }
})

const emits = defineEmits(['callback'])

const isPopup = ref(false)
const ani = ref('')

const open = () => {
  isPopup.value = true
  nextTick(() => {
    setTimeout(() => {
      ani.value = 'open-animation'
    }, 30)
  })
}

const close = (v: boolean) => {
  let isClose = v == false ? false : true
  if (isClose) {
    ani.value = ''
    setTimeout(() => {
      isPopup.value = false
      emits('callback')
    }, 200)
  }
}

defineExpose({ open, close })
</script>
<style lang="scss" scoped>
/*弹窗*/
.loading-popup {
  .shade-popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000;
    opacity: 0;
    transition: all 0.6s;
    z-index: 998;
  }

  .shade-popup.open-animation {
    opacity: 0.5;
  }

  .loading-content {
    z-index: 999;
    position: fixed;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    border-radius: 20rpx;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: scale(1.2);
    transition: all 0.6s;
    opacity: 0;
  }

  .loading-content.open-animation {
    transform: scale(1);
    opacity: 1;
  }
}

/*圆形加载*/
.circle-loading {
  width: 150rpx;
  height: 150rpx;
  position: relative;
  margin: auto;

  .dot {
    position: absolute;
    top: 0;
    left: 0;
    width: 150rpx;
    height: 150rpx;
    animation: 1.5s loadrotate cubic-bezier(0.8, 0.005, 0.5, 1) infinite;

    &:after,
    .first-dot {
      content: '';
      position: absolute;
      width: 18rpx;
      height: 18rpx;
      background: #c73c23;
      border-radius: 50%;
      left: 50%;
    }

    .first-dot {
      background: #c73c23;
      animation: 1.5s dotscale cubic-bezier(0.8, 0.005, 0.5, 1) infinite;
    }
  }
}

@for $i from 1 through 4 {
  .circle-loading {
    & > .dot:nth-child(#{$i}) {
      animation-delay: 0.15s * $i;
    }
  }
}

@keyframes loadrotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes dotscale {
  0%,
  10% {
    width: 28rpx;
    height: 28rpx;
    margin-left: -2rpx;
    margin-top: -5rpx;
  }

  50% {
    width: 16rpx;
    height: 16rpx;
    margin-left: 0rpx;
    margin-top: 0rpx;
  }

  90%,
  100% {
    width: 28rpx;
    height: 28rpx;
    margin-left: -2rpx;
    margin-top: -5rpx;
  }
}

/*矩形加载*/
.rectangle-loading {
  height: 60px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  .dot {
    height: 50px;
    width: 10px;
    margin-right: 20rpx;
  }
}

$color: #ff3404, skyblue, #f48f00, #39d754;

@for $i from 1 through 4 {
  .rectangle-loading {
    & > .dot:nth-child(#{$i}) {
      animation: load-frame 1s infinite linear 0s + $i * 0.12;
      background: #{nth($color, $i)};
    }

    @if $i==4 {
      & > .dot:nth-child(#{$i}) {
        margin-right: 0;
      }
    }
  }
}

@keyframes load-frame {
  0% {
    height: 45px;
    background: palegoldenrod;
  }

  50% {
    height: 12px;
  }

  100% {
    height: 45px;
  }
}
</style>
