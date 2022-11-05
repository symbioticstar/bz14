import { useBreakpoints } from '@vueuse/core'
import { defaultBreakpoints } from 'naive-ui/es/config-provider/src/config'

export function useResponsive() {
  const breakpoints = useBreakpoints(defaultBreakpoints)
  const isMobile = breakpoints.smaller('s')
  return { breakpoints, isMobile }
}
