<script lang='tsx' setup>
import { NButton, NPopover } from 'naive-ui'
import { RouteRecordRaw, RouterLink, useRoute, useRouter } from 'vue-router'
import { ChevronDownIcon as ChevronDown, DotsIcon as Dots, Menu2Icon as Menu2 } from 'vue-tabler-icons'
import { computed, ref } from 'vue'
import { useResponsive } from '@/assets/utils/responsive'
import { useMenu } from '@/data/menu'
import { useElRef } from '@/assets/utils/el-ref'


const dropdownOptions = [
  {
    label: () => (
      <NButton text onClick={() => {}}>
        权限申请
      </NButton>
    ),
    key: 'permission',
  },
  {
    label: () => <RouterLink to='/token'>访问令牌</RouterLink>,
    key: 'token',
  },
  {
    label: () => (
      <NButton text onClick={() => void 0}>
        退出登录
      </NButton>
    ),
    key: 'logout',
  },
]

const showModal = ref()


function fromRoute(e: RouteRecordRaw) {
  return e.meta?.title
    ? {
      path: e.path,
      title: typeof e.meta.title === 'function' ? e.meta.title(route) : e.meta.title,
      label: typeof e.meta.title === 'function' ? e.meta.title(route) : e.meta.title,
      link: e.meta.link,
      key: e.path,
    }
    : null
}

const route = useRoute()
const router = useRouter()

const matched = computed(() => route.matched)

const lastPath = computed(() => matched.value && matched.value[matched.value.length - 1])
const penultimatePath = computed(() => matched.value && matched.value[matched.value.length - 2])

const lastRouteChildren = computed(() => {
  const children = lastPath.value && lastPath.value.children.map(e => fromRoute(e)).filter(e => e)
  if (children?.length) {
    children.unshift({ label: '首页', key: lastPath.value.path } as any)
  }
  return children
})

const penultimateRouteChildren = computed(() => {
  if (!(penultimatePath.value && lastRouteChildren.value?.length === 0)) return
  const children = penultimatePath.value.children
    .map(e => fromRoute(e))
    .filter(e => e)
    .map(e => e!)
  const home = { label: '首页', key: penultimatePath.value.path }
  const exactIndex = children.findIndex(e => e.path === route.path)
  const exact = children[exactIndex]
  children.splice(exactIndex, 1)
  return [exact, home, ...children].filter(e => e)
})

const routeChildren = computed(() => penultimateRouteChildren.value ?? lastRouteChildren.value)
const routeTitles = computed(() => {
  const titles = matched.value.map(e => fromRoute(e)).filter(e => e)
  if (penultimateRouteChildren.value && penultimateRouteChildren.value.length > 0) {
    titles.pop()
  }
  if (lastPath.value) {
    const elements = lastPath.value.meta?.elements as any
    elements?.forEach(e => {
      titles.unshift({
        path: e.path,
        link: e.path,
        title: e.title,
        key: e.path,
      } as any)
    })
  }
  return titles
})

function handleSelect(path: string) {
  router.push(path)
}

const { availableMenuOptions } = useMenu()

const { isMobile } = useResponsive()

const popoverRef = useElRef<any>()

function onMenuUpdate() {
  popoverRef.value?.setShow(false)
}
</script>

<template>
  <n-layout-header :bordered='true' :position="isMobile ? 'static' : 'absolute'" class='main-header'>
    <n-breadcrumb style='max-width: 70vw; overflow: hidden; text-overflow: ellipsis'>
      <n-breadcrumb-item v-for='e of routeTitles' :key='e.path'>
        <router-link v-if='e.link' :to='e.path' style='color: #1976d2'>{{ e.title }}</router-link>
        <span v-else>{{ e.title }}</span>
      </n-breadcrumb-item>
      <n-breadcrumb-item v-if='routeChildren && routeChildren.length'>
        <n-dropdown :options='routeChildren' trigger='click' @select='handleSelect'>
          <n-button text>
            <span>{{ routeChildren[0].label }}</span>
            <n-icon>
              <ChevronDown />
            </n-icon>
          </n-button>
        </n-dropdown>
      </n-breadcrumb-item>
    </n-breadcrumb>
    <n-menu style='flex-grow: 1'></n-menu>
    <n-space align='center' size='large'>
      <template v-if='!isMobile'>
        <n-text>用户名</n-text>
        <n-dropdown :options='dropdownOptions' placement='bottom-end' trigger='hover'>
          <n-button circle>
            <template #icon>
              <n-icon>
                <dots></dots>
              </n-icon>
            </template>
          </n-button>
        </n-dropdown>
      </template>
      <template v-else>
        <div style='display: flex; align-items: center'>
          <n-popover
            v-if='isMobile'
            ref='popoverRef'
            display-directive='show'
            placement='bottom-end'
            style='padding: 0; width: 288px'
            trigger='click'
          >
            <template #trigger>
              <n-icon size='20'>
                <menu2></menu2>
              </n-icon>
            </template>
            <div style='overflow: auto; max-height: 79vh'>
              <n-menu :options='availableMenuOptions' @update:value='onMenuUpdate'></n-menu>
            </div>
          </n-popover>
        </div>
      </template>
    </n-space>
  </n-layout-header>
</template>

<style>
.main-header {
  z-index: 10;
  display: flex;
  align-items: center;
  height: 45px;
  padding: 0 14px 0 14px;
}
</style>
