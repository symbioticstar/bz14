import { feedback } from '@/assets/utils/feedback-utils'

/**
 * success message + error message
 *
 * @noexcept
 */
export async function alertScope(fn: Promise<any> | (() => Promise<any>)) {
  try {
    const result = await (typeof fn === 'function' ? fn() : fn)
    feedback.message.success('成功')
    return result
  } catch (e) {
    const error = e as Error
    console.log({ feedback })
    feedback.notification.error({ duration: 1e5, content: error.message, meta: error.stack })
  }
}

/**
 * error message
 *
 * @noexcept
 */
export async function errorScope(fn: Promise<any> | (() => Promise<any>)) {
  try {
    return await (typeof fn === 'function' ? fn() : fn)
  } catch (e) {
    const error = e as Error
    feedback.notification.error({ duration: 1e5, content: error.message, meta: error.stack })
  }
}
