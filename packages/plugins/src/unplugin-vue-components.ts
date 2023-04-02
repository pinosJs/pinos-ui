import { noStylesComponents, prefix, toKebabCase } from './utils'
import type { ComponentInfo, ComponentResolver } from 'unplugin-vue-components/types'

export interface PinosUIResolverOptions {
  /**
   * import css or sass styles with components
   *
   * @default 'css'
   */
  importStyle?: boolean | 'css' | 'sass'
  /**
  * auto import for directives
  *
  * @default true
  */
  directives?: boolean
}

function getSideEffects(name: string, options: PinosUIResolverOptions) {
  const { importStyle } = options

  name = name.slice(prefix.length)

  if (noStylesComponents.has(name))
    return

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

  return {
    name,
    from: 'pinos-ui',
    sideEffects: getSideEffects(name, options)
  }
}

function resolveDirective(name: string, options: PinosUIResolverOptions): ComponentInfo | undefined {
  const { directives = true } = options
  if (!directives)
    return

  const directivesMap: Record<string, { importName: string; styleName: string }> = {
    vEllipsis: { importName: 'vEllipsis', styleName: '' }
  }

  const directive = directivesMap[name]
  if (!directive)
    return

  return {
    name: directive.importName,
    from: 'pinos-ui',
    sideEffects: directive.styleName
      ? getSideEffects(directive.styleName, options)
      : undefined
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
    },
    {
      type: 'directive',
      resolve: (name) => {
        return resolveDirective(name, options)
      }
    }
  ]
}
