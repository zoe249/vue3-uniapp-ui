import request from './request.js'
const api = {
  //登录
  loginApi(data: unknown) {
    return request.postApi('/appLogin', data)
  }
}
export default api
