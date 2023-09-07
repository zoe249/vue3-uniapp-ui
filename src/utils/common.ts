export function commonObj() {
  const listLoad = reactive({
    page: 1,
    size: 10,
    loading: false,
    finished: false,
    refresh: false,
    list: [] as any[],
    refreshLoad() {
      listLoad.page = 1
      listLoad.list = []
      listLoad.refresh = true
      listLoad.finished = true
    },
    reload() {
      listLoad.page = 1
      listLoad.list = []
      listLoad.finished = false
    }
  })
  return {
    listLoad
  }
}
