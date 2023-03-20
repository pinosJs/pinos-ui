import { prefix } from './config/constant'
import { configProps } from './utils/props'
import { UpperCamelCase } from './utils/utils'
import type { PropsOptions } from './props'
import type { App } from 'vue'

export function useInstall(components: any[]) {
  return function install(app: App, opts?: {
    props?: PropsOptions
  }) {
    const { props = {} } = opts || {}

    configProps(props, app)

    for (const component of components)
      app.component(UpperCamelCase(`${prefix}-${component.name}`), component)
  }
}
