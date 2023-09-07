<template>
  <view class="my-container-box">
    <button @click="toTest()">测试页面</button>
    <yp-list :listLoad="listLoad" @getList="getList()">
      <view style="margin-top: 100rpx" v-for="(item, index) in listLoad.list" :key="index">{{ item }}</view>
    </yp-list>
  </view>
</template>

<script setup lang="ts">
import { commonObj } from '@/utils/common'
import { onLoad } from '@dcloudio/uni-app'
import { useProxy } from '@/utils/proxy'
const { listLoad } = commonObj()
const { proxy } = useProxy()
const getList = async () => {
  let rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  let total = 100
  if (listLoad.page == 1) listLoad.list = []
  listLoad.list = listLoad.list.concat(rows)
  if (rows.length != listLoad.size || listLoad.page >= Math.ceil(total / listLoad.size)) {
    listLoad.finished = true
  } else {
    listLoad.finished = false
    listLoad.page++
  }
  if (listLoad.refresh) {
    listLoad.refresh = false
  }
}
const toTest = () => {
  uni.navigateTo({ url: '/pages/test/index' })
}
onLoad(() => {
  getList()
})
// 上拉加载
onReachBottom(() => {
  if (!listLoad.finished) {
    getList()
  }
})
// 下拉刷新
onPullDownRefresh(() => {
  if (listLoad.refresh) return
  listLoad.refreshLoad()
  getList()
    .then(() => {
      uni.stopPullDownRefresh()
    })
    .catch(() => {
      uni.stopPullDownRefresh()
    })
})
</script>

<style lang="scss" scoped></style>
