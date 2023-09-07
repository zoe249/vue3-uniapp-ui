<template>
  <scroll-view
    class="content"
    :scroll-y="scrollY"
    :scroll-x="scrollX"
    :style="{ height: height }"
    :show-scrollbar="showScrollbar"
    :refresher-enabled="state.scroll_refresher_enabled"
    :refresher-default-style="systemStore.theme === 'light' ? 'black' : 'white'"
    :refresher-triggered="listLoad.refresh"
    :refresher-threshold="threshold"
    @scrolltoupper="scrolltoupper"
    @scrolltolower="scrolltolower"
    @refresherrefresh="refresherrefresh"
  >
    <slot></slot>
    <view :style="{ 'margin-top': mt }" v-if="listLoad.list.length == 0" class="noData">{{ noDataMsg }}</view>
  </scroll-view>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/module/system'
import { onPageScroll } from '@dcloudio/uni-app'
import type { PropType } from 'vue'

const props = defineProps({
  scrollY: {
    type: Boolean,
    default: true
  },
  scrollX: {
    type: Boolean,
    default: false
  },
  height: {
    type: String as PropType<String | Number>,
    default: '100%'
  },
  // 控制是否出现滚动条
  showScrollbar: {
    type: Boolean,
    default: false
  },
  // 下拉刷新阈值
  threshold: {
    type: Number,
    default: 60
  },
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

const emits = defineEmits(['scrolltoupper', 'getList'])
onPageScroll((e: any) => {
  if (e.scrollTop === 0) {
    state.scroll_refresher_enabled = true
  } else {
    state.scroll_refresher_enabled = false
  }
})
const systemStore = useSystemStore()
const state = reactive({
  scroll_refresher_enabled: false
})
/**
 * 滚动到顶部/左边，会触发 scrolltoupper 事件
 */
const scrolltoupper = () => {
  emits('scrolltoupper')
}

/**
 * 滚动到底部/右边，会触发 scrolltolower 事件
 */
const scrolltolower = () => {
  if (!props.listLoad.finished) {
    emits('getList')
  }
}

/**
 * 自定义下拉刷新被触发
 */
const refresherrefresh = (event?: Event) => {
  props.listLoad.refreshLoad()
  emits('getList')
}
</script>

<style lang="scss" scoped>
.noData {
  text-align: center;
  font-size: 30rpx;
  color: gray;
}
</style>
