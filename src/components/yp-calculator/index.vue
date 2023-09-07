<template>
  <view class="content" v-show="show">
    <view class="close" @click="handleClose">
      <u-icon name="arrow-down" color="#333" size="20"></u-icon>
    </view>
    <view class="top-text">{{ count }}</view>
    <view class="keyboard-wrap">
      <view class="keyboard-num">
        <view
          class="num-item"
          :class="['item' + index, { active: currentIndex === index }]"
          v-for="(item, index) in keybords"
          :key="index"
          @touchstart="handleTouchStart(item, index)"
          @touchend="handleTouchend(item, index)"
        >
          {{ item.label }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['close', 'success'])
interface countertype {
  label: string
  value: string
  type: 'func' | 'number' | 'enter' | 'clear'
}

// 虚拟键盘数组
const keybords = reactive<Array<countertype>>([
  {
    label: '清空',
    value: 'clear',
    type: 'clear'
  },
  {
    label: '/',
    value: '/',
    type: 'func'
  },
  {
    label: '*',
    value: '*',
    type: 'func'
  },
  {
    label: '-',
    value: '-',
    type: 'func'
  },
  {
    label: '1',
    value: '1',
    type: 'number'
  },
  {
    label: '2',
    value: '2',
    type: 'number'
  },
  {
    label: '3',
    value: '3',
    type: 'number'
  },
  {
    label: '+',
    value: '+',
    type: 'func'
  },
  {
    label: '4',
    value: '4',
    type: 'number'
  },
  {
    label: '5',
    value: '5',
    type: 'number'
  },
  {
    label: '6',
    value: '6',
    type: 'number'
  },
  {
    label: '确定',
    value: 'enter',
    type: 'enter'
  },
  {
    label: '7',
    value: '7',
    type: 'number'
  },
  {
    label: '8',
    value: '8',
    type: 'number'
  },
  {
    label: '9',
    value: '9',
    type: 'number'
  },
  {
    label: '0',
    value: '0',
    type: 'number'
  },
  {
    label: '.',
    value: '.',
    type: 'number'
  }
])
// 显示内容
const count = ref<string>('')

let flag = false
// 当前运算符
let activeFunc: string
// 运算符之前的数
let oldVal: string
// 运算符之后的数
let newVal: string

/**
 * 按下虚拟键的方法
 * @param item 虚拟键
 */
const calculatorNum = (item: countertype) => {
  if (item.type === 'func') {
    // 输入运算符
    if (!flag) {
      // 运算符不能连续重复输入
      let temp = count.value[count.value.length - 1]

      if (temp === '/' || temp === '*' || temp === '-' || temp === '+') return
      // 拼接表达式
      count.value += item.value
      // 保存当前运算符
      activeFunc = item.value
      // 分割成两个数
      oldVal = count.value.split(activeFunc)[0]
    }
    flag = true
  } else if (item.type === 'number') {
    newVal = count.value.split(activeFunc)[1]
    // 输入数字
    if (item.value === '.' && count.value.indexOf('.') < 0) {
      // 判断点击的是小数点 同时 输入框中不存在小数点
      count.value += item.value
    } else if (item.value === '.' && count.value.indexOf('.') >= 0 && newVal && newVal.indexOf('.') >= 0) {
      // 判断点击的是小数点 同时 输入框中存在小数点 不操作
      return
    } else {
      count.value += item.value
    }
  } else if (item.type === 'enter') {
    // 输入确认按钮 计算结果
    if (flag) {
      newVal = count.value.split(activeFunc)[1]
      count.value = handleComputed(oldVal, newVal)
      emits('success', count.value)
    }
    flag = false
  } else if (item.type === 'clear') {
    if (item.value === 'clear') {
      count.value = ''
      flag = false
      return
    }
  }
}

/**
 * 计算方法 加减乘除
 */
function handleComputed(num1: string, num2: string): string {
  let tempCount: number = 0
  if (num2 === '') return num1.toString()
  switch (activeFunc) {
    case '+':
      tempCount = Number(num1) + Number(num2)
      break
    case '-':
      tempCount = Number(num1) - Number(num2)
      break
    case '*':
      tempCount = Number(num1) * Number(num2)
      break
    case '/':
      tempCount = Number(num1) / Number(num2)
      break
  }
  return tempCount.toString()
}

let currentIndex = ref<number>(-1)
/**
 * 手指触摸
 */
const handleTouchStart = (item: countertype, index: number) => {
  currentIndex.value = index
}
/**
 * 手指离开
 */
const handleTouchend = (item: countertype, index: number) => {
  currentIndex.value = -1
  calculatorNum(item)
}

/**
 * 关闭计算器
 */
const handleClose = () => {
  emits('close')
}
</script>

<style lang="scss" scoped>
.content {
  background-color: #fff;
  position: absolute;
  z-index: 99;
  bottom: 0;
  padding-top: 30rpx;
  padding-bottom: 50rpx;
}
.close {
  position: absolute;
  height: 20rpx;
  right: 30rpx;
  top: 10rpx;
}
.top-text {
  height: 100rpx;
  line-height: 100rpx;
  font-size: 38rpx;
  font-weight: bold;
}

// 虚拟键盘 grid布局 start
.keyboard-wrap {
  font-size: 32rpx;
  font-weight: bold;
  .keyboard-num {
    display: grid;
    grid-template-columns: 200rpx 200rpx 200rpx 150rpx;
    grid-template-rows: repeat(5, 100rpx);
    grid-gap: 5rpx;

    .num-item {
      transition: background-color 0.1s;
      background-color: #d8d7d7;
      text-align: center;
      line-height: 100rpx;
      border-radius: 8rpx;
    }

    .item15 {
      grid-column-start: span 2;
    }
    .item3 {
      grid-template-columns: 150rpx;
    }

    .item11 {
      grid-row-start: span 3;
      line-height: 300rpx;
    }
    .active {
      transition: background-color 0.1s;
      background-color: rgb(100, 100, 100);
    }
  }
}
// 虚拟键盘 end
</style>
