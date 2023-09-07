/**
 * 函数防抖
 * @param func 回调函数
 * @param wait 延迟执行的时间
 * @param immediate 是否立即执行一次
 */
export function debounce(func: () => void, wait: number, immediate = true) {
  let timeout: any, result: any
  return function (this: any) {
    const self = this
    // eslint-disable-next-line prefer-rest-params
    const args = arguments
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      // 如果已经执行过，不再执行
      const callNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      if (callNow) result = func.apply(self, args as any)
    } else {
      timeout = setTimeout(function () {
        func.apply(self, args as any)
      }, wait)
    }
    return result
  }
}
/**
 * 深拷贝
 * @param obj 需要拷贝的对象
 * @returns 深拷贝后的对象
 */
export function deepCopy<T>(obj: T): T {
  if (typeof obj !== 'object') return obj
  const newObj = obj instanceof Array ? [] : ({} as any)
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      //hasOwnProperty: 检测一个属性是否是对象的自有属性
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
    }
  }
  return newObj
}
/**
 * 时间格式化
 * @param time 传入的时间
 * @param fmt 格式化格式
 * @param isIOS 是否是ios手机
 */
export function formatDate(time = '', fmt = 'yyyy-MM-dd hh:mm:ss', isIOS = false) {
  if (!time) {
    return ''
  }
  let platform = uni.getSystemInfoSync().platform
  if (platform !== 'android' && isIOS) {
    time = time.replace(/-/g, '/')
  }
  let date = new Date(time)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  } as any
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length))
    }
  }
  return fmt
}
// 深度拷贝
export const deepObjClone = (obj: any) => {
  const weakMap = new WeakMap()
  function clone(obj: any) {
    if (obj == null) {
      return obj
    }
    if (obj instanceof Date) {
      return new Date(obj)
    }
    if (obj instanceof RegExp) {
      return new RegExp(obj)
    }
    if (typeof obj !== 'object') return obj

    if (weakMap.get(obj)) {
      return weakMap.get(obj)
    }
    const copy = new obj.constructor()
    weakMap.set(obj, copy)
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key]
        copy[key] = clone(value)
      }
    }
    return copy
  }
  return clone(obj)
}
/** 公共提示
 * @param {Object} title
 * @param {Object} icon successs/loading/error
 * @param {Object} duration
 * @param {Object} mask 是否显示透明蒙层
 */
export function toast(title: any, icon: any = 'error', duration?: number, mask?: boolean) {
  if (icon === 'loading') {
    uni.showLoading({
      title: title || '',
      mask: mask || false
    })
  } else {
    uni.showToast({
      title: title || '',
      icon: title.length > 7 ? 'none' : icon,
      duration: duration == 0 ? 0 : duration || 2000,
      mask: mask || false
    })
  }
}
