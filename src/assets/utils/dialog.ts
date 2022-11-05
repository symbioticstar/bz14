import { feedback } from '@/assets/utils/feedback-utils'

export function defaultConfirm(title: string, content: string) {
  return new Promise((resolve, reject) => {
    feedback.dialog.warning({
      title,
      content,
      positiveText: '确认',
      negativeText: '取消',
      onPositiveClick() {
        resolve(true)
      },
    })
  })
}
