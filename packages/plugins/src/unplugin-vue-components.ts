import type { ComponentInfo, ComponentResolver } from 'unplugin-vue-components/types'
import { prefix } from '~/pinos-ui/config/constant'
import { toKebabCase } from '~/pinos-ui/utils/common'

export interface PinosUIResolverOptions {
  /**
   * import css or sass styles with components
   *
   * @default 'css'
   */
  importStyle?: boolean | 'css' | 'sass'
}

function getSideEffects(name: string, options: PinosUIResolverOptions) {
  const { importStyle } = options

  if (!importStyle)
    return

  name = toKebabCase(name)

  if (importStyle === 'sass') {
    return [
      `pinos-ui/styles/${name}.scss`
    ]
  } else if (importStyle === true || importStyle === 'css') {
    return [
      `pinos-ui/dist/css/${name}.css`
    ]
  } else {
    return ['']
  }
}

function resolveComponent(name: string, options: PinosUIResolverOptions): ComponentInfo | undefined {
  if (!name.toLowerCase().startsWith(prefix.toLowerCase()))
    return

  name = name.slice(prefix.length)
  return {
    name,
    from: 'pinos-ui',
    sideEffects: getSideEffects(name, options)
  }
}

export function PinosUIResolver(options: PinosUIResolverOptions = {}): ComponentResolver[] {
  options = { importStyle: 'css', ...options }

  return [
    {
      type: 'component',
      resolve: (name) => {
        return resolveComponent(name, options)
      }
    }
  ]
}
