<script lang="tsx" setup>
import { dateZhCN, GlobalThemeOverrides, zhCN } from 'naive-ui'
import AppSider from '@/AppSider.vue'
import AppHeader from '@/AppHeader.vue'
import { layoutControl } from '@/data/layout-control'
import AppMountPoint from '@/AppMountPoint.vue'
import { useResponsive } from '@/assets/utils/responsive'
import { computed } from 'vue'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#2080f0',
    primaryColorHover: '#4098fc',
    primaryColorPressed: '#1060c9',
    primaryColorSuppl: '#4098fc',
  },
  Tabs: {
    tabGapSmallLine: '24px',
    tabGapSmallBar: '24px',
  },
  Card: {
    borderColor: 'rgba(213, 213, 225, 1)',
  },
  LoadingBar: {
    height: '3px',
  },
}

const { isMobile } = useResponsive()

const showHeader = computed(() => (layoutControl.header ? layoutControl.header : isMobile.value))
const layoutStyle = computed(() => showHeader.value && !isMobile.value && { top: '45px' })
</script>

<template>
  <n-config-provider :date-locale="dateZhCN" :locale="zhCN" :theme-overrides="themeOverrides">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-dialog-provider>
          <n-notification-provider>
            <n-layout position="absolute">
              <n-layout :has-sider="true" position="absolute">
                <app-sider v-if="!isMobile" />
                <n-layout>
                  <app-header v-if="showHeader"></app-header>
                  <n-layout-content :style="layoutStyle" class="layout-content">
                    <app-mount-point>
                      <router-view></router-view>
                    </app-mount-point>
                  </n-layout-content>
                </n-layout>
              </n-layout>
            </n-layout>
          </n-notification-provider>
        </n-dialog-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style>
@import '@/assets/font.css';
@import '@/assets/main.css';
@import '@/assets/spacing-helpers.css';
</style>
