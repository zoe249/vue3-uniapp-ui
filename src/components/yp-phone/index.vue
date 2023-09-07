<template>
  <view class="content">
    <view class="img-icon" @click="handlePhoneCall">
      <image
        :style="{ height: height + 'rpx', width: width + 'rpx' }"
        src="@/static/default/phone.png"
        alt=""
      />
    </view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  phone: {
    type: String,
    required: true
  },
  height: {
    type: Number,
    default: 50
  },
  width: {
    type: Number,
    default: 50
  }
})

const emits = defineEmits(['success', 'fail'])

const handlePhoneCall = () => {
  uni.makePhoneCall({
    phoneNumber: props.phone,
    success() {
      emits('success')
    },
    fail(err) {
      emits('fail')
    }
  })
}
</script>

<style lang="scss" scoped>
.img-icon {
  height: 50rpx;
  width: 50rpx;
}
</style>
