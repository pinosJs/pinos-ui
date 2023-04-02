import { namespace as defaultNamespace, prefix } from '@config/constant'
import { toCapitalCase } from '@pinos-ui/utils'
import { configNamespace } from '@utils/namespace'
import { configProps } from '@utils/props'
import type { PropsOptions } from './props'
import type { App } from 'vue'

export interface InstallOptions {
  props?: PropsOptions
  namespace?: string
}

export function useInstall(components: any[]) {
  return {
    install(app: App, opts: InstallOptions = {}) {
      const { props = {}, namespace = defaultNamespace } = opts

      configProps(props, app)
      configNamespace(namespace, app)

      for (const component of components) {
        if (typeof component === 'function' || typeof component.install === 'function')
          app.use(component)
        else
          app.component(toCapitalCase(`${prefix}-${component.name}`), component)
      }
    }
  }
}
