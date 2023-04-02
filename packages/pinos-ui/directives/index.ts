import { vEllipsis } from './ellipsis'

import type { App } from 'vue'

export function install(app: App) {
  app.directive('ellipsis', vEllipsis)
}
