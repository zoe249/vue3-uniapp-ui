import config from '@/config'
const useSystemStore = defineStore('system', {
  state: () => ({
    theme: config.theme
  }),
  actions: {
    // 更新系统主题
    updateTheme(theme: 'light' | 'dark') {
      this.theme = theme
    }
  }
})

export default useSystemStore
