import { computed, VNodeChild } from 'vue'
import { MenuOption, NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router'

import { HomeIcon as Home } from 'vue-tabler-icons'

function createOption(
  path: string | null,
  name: string,
  icon: VNodeChild,
  requiredPermission: string | null,
  etc?: MenuOption,
) {
  return {
    label: () => (path ? <RouterLink to={path}>{name}</RouterLink> : name),
    key: etc?.key ?? path ?? name,
    icon: icon ? () => <NIcon>{icon}</NIcon> : undefined,
    requiredPermission,
    ...etc,
  }
}

export function useMenu() {
  const menuOptions: MenuOption[] = [
    createOption('/', 'BZ14', <Home />, null, {
      extra: () => (
        <span style="color: grey; font-size: 12px; margin-left: 6px" class="monospace">
          0.21.0
        </span>
      ),
    }),
  ]

  const availableMenuOptions = computed(() => menuOptions)

  return { availableMenuOptions }
}
