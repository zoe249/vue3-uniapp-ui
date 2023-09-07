import { toast } from '@/utils/index'
const filterUrl = [] as string[]
const httpRequest = (url: string, method: string, data: any, header: any) => {
  let token = uni.getStorageSync('token')
  let config = {
    url: url,
    method,
    data: data || {},
    header: header || {}
  } as any
  if (token) {
    config.header['Authorization'] = 'Bearer ' + token
  }
  if (config.method == 'POST' || config.method == 'PUT') {
    config.header['Content-Type'] = 'application/json;charset=utf-8'
  }
  return new Promise((resolve, reject) => {
    uni.request({
      ...config,
      success(res: any) {
        let { data } = res
        if (Number(data.code) === 401) {
          toast('登录信息失效,请重新登录')
          reject(data)
        } else if (filterUrl.some((v) => config.url.search(v) != -1)) {
          resolve(data)
        } else if (Number(data.code) === 403) {
          toast('您没有权限!')
          reject(data)
        } else if (Number(data.code !== 200)) {
          toast(data.msg || '请求错误,请重试')
          reject(data)
        } else {
          resolve(data)
        }
      },
      fail(err: any) {
        toast('请求错误')
        reject(err)
      }
    })
  })
}
const getApi = (url: string, data?: any, header?: any) => httpRequest(url, 'GET', data, header)
const postApi = (url: string, data?: any, header?: any) => httpRequest(url, 'POST', data, header)
const putApi = (url: string, data?: any, header?: any) => httpRequest(url, 'PUT', data, header)
const deleteApi = (url: string, data?: any, header?: any) => httpRequest(url, 'DELETE', data, header)
export default {
  getApi,
  postApi,
  putApi,
  deleteApi
}
