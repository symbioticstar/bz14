import { ref } from 'vue'

export function useElRef<T = HTMLElement>() {
  return ref<T>()
}
