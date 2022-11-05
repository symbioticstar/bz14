<script lang="ts" setup>
import { useDialog, useLoadingBar, useMessage, useNotification } from 'naive-ui'
import { feedback } from '@/assets/utils/feedback-utils'
import { useRouter } from 'vue-router'
import { layoutControl } from '@/data/layout-control'

feedback.message = useMessage()
feedback.dialog = useDialog()
feedback.notification = useNotification()
feedback.loadingBar = useLoadingBar()

const router = useRouter()

router.beforeEach(() => {
  feedback.loadingBar.start()
})
router.afterEach(() => {
  feedback.loadingBar.finish()
})
</script>

<template>
  <div :class="layoutControl.collapseEnabled ? 'px-4 py-3' : ''">
    <slot />
  </div>
</template>
