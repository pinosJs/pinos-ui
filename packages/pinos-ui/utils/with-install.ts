import { prefix } from '@config/constant'
import { toCapitalCase } from '@utils/common'
import type { Component, App } from 'vue'

export function withInstall(component: Component) {
  return function install(app: App) {
    app.component(toCapitalCase(`${prefix}-${component.name}`), component)
  }
}
