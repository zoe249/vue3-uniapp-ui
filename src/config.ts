// let protocol = 'http://' // 协议
let protocol = 'https://' // 协议
// let host = '' // 外网域名+接口 开发环境
// let host = '' // 外网域名+接口 测试环境
let host = 'mock.presstime.cn/mock/643911087e9ae476cd8b4fd9/bff' // 外网域名+接口 正式环境
let appletName = 'Vue3小程序' // 小程序名称
let uploadUrl = '' // 七牛云地址
let imgUrl = '' // 图片七牛云地址
let theme = 'light' // 项目主题颜色

let config = {
  protocol,
  host,
  appletName,
  uploadUrl,
  imgUrl,
  theme
}
export default config
