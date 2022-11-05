<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <n-result status="404" style="margin-top: 25vh" title="404 资源不存在">
    <template #footer>
      <n-button @click="router.push('/')"> 回到首页 </n-button>
      <n-button class="ml-2" @click="router.back()">返回</n-button>
    </template>
  </n-result>
</template>
