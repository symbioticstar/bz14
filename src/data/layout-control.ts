import { onBeforeUnmount, onMounted, reactive } from 'vue'

export const layoutControl = reactive({
  collapse: false,
  collapseEnabled: true,
  header: true,
  useChanged: false,
})

export function useDenseLayout() {
  onMounted(() => {
    layoutControl.header = false
    layoutControl.collapse = true
    layoutControl.collapseEnabled = false
  })
  onBeforeUnmount(() => {
    layoutControl.collapseEnabled = true
    layoutControl.header = true
    layoutControl.collapse = false
  })
}
