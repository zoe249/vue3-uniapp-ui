import { createSSRApp } from 'vue'
import App from './App.vue'
import store from './store'
import { toast } from '@/utils/index'
import api from './api/commonApi'
import uviewPlus from 'uview-plus'
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: typeof api
    $toast: typeof toast
  }
}
export function createApp() {
  const app = createSSRApp(App)
  app.use(uviewPlus)
  app.use(store)
  app.config.globalProperties.$api = api
  app.config.globalProperties.$toast = toast
  return {
    app
  }
}
