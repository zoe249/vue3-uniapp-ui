<template>
  <view class="my-list-box">
    <slot></slot>
    <view :style="{ 'margin-top': mt }" v-if="listLoad.list.length == 0" class="noData">{{ noDataMsg }}</view>
  </view>
</template>

<script lang="ts" setup>
const props = defineProps({
  // 列表加载对象集合
  listLoad: {
    type: Object,
    required: true
  },
  // 暂无数据距离顶部
  mt: {
    type: String,
    default: '20rpx'
  },
  // 暂无数据时提示文字
  noDataMsg: {
    type: String,
    default: '暂无数据'
  }
})
</script>

<style lang="scss" scoped></style>
