import { reactive } from 'vue'
import type { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'
import type { DialogApiInjection } from 'naive-ui/es/dialog/src/DialogProvider'
import type { LoadingBarApiInjection } from 'naive-ui/es/loading-bar/src/LoadingBarProvider'
import type { NotificationApiInjection } from 'naive-ui/es/notification/src/NotificationProvider'

export const feedback = reactive<{
  message: MessageApiInjection
  dialog: DialogApiInjection
  loadingBar: LoadingBarApiInjection
  notification: NotificationApiInjection
}>({
  message: null,
  dialog: null,
  loadingBar: null,
  notification: null,
} as any)
