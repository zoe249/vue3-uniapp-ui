/// <reference types="vite/client" />

declare module '@/common/qrcode/qrcode.js'
declare module '@/common/qrcode/uqrcode.js'
declare module 'uview-plus'
declare var wx
declare var tt
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
