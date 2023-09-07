const useUserStore = defineStore('user', {
  state: () => ({
    name: '菠萝吹雪'
  }),
  actions: {
    updateName(name: string) {
      this.name = name
    }
  }
})

export default useUserStore
