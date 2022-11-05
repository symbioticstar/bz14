<script lang="tsx">
import { defineComponent } from 'vue'
import { axiosRef } from '@/assets/utils/fetcher'

const F = () => <h1>123</h1>

export default defineComponent({
  components: { F },
  setup() {
    const { data } = axiosRef('/')

    return { data, F }
  },
})
</script>

<template>
  <main>
    {{ data }}
    <f />
    <copy-icon></copy-icon>
    <h2></h2>
  </main>
</template>
