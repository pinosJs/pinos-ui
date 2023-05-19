import { PinConfigProvider } from './components/config-provider'
import { PinFilterGroup } from './components/filter-group'
import { PinTable } from './components/table'
import { PinZoomIn } from './components/zoom-in'
import { install } from './directives'

export const components = [
  PinConfigProvider,
  PinFilterGroup,
  PinTable,
  PinZoomIn,
  install
]
