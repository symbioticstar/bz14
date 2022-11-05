<script lang="tsx" setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { MenuOption } from 'naive-ui'
import { layoutControl } from '@/data/layout-control'
import { useMenu } from '@/data/menu'

const { availableMenuOptions } = useMenu()

function findMenuValue(options: MenuOption[], path: string): number | string | undefined {
  for (const option of options) {
    if (option.children) {
      const value = findMenuValue(option.children, path)
      if (value) return value
    }
    if (option.key === path) {
      return option.key
    }
  }
  return undefined
}

const route = useRoute()
const activeKey = computed(() => availableMenuOptions.value && findMenuValue(availableMenuOptions.value, route.path))
</script>

<template>
  <n-layout-sider
    v-model:collapsed="layoutControl.collapse"
    :bordered="true"
    :collapsed-width="60"
    :show-trigger="layoutControl.collapseEnabled"
    collapse-mode="width"
    collapsed-trigger-style="top: 240px"
    style="background: #f3f3f3"
    trigger-style="top: 240px"
    width="200"
  >
    <n-menu
      :collapsed-width="60"
      :indent="28"
      :options="availableMenuOptions"
      :root-indent="28"
      :value="activeKey"
      class="app-sider"
      style="font-size: 15px"
    />
  </n-layout-sider>
</template>

<style>
.app-sider .n-menu-item-content-header {
  margin-left: 10px;
}
</style>
