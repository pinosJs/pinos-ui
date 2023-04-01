import { noStylesComponents, prefix, toKebabCase, toCapitalCase } from './utils'
import type { Lib } from 'vite-plugin-style-import'

export interface PinosUIStyleImportResolveOptions {
  /**
   * import css or sass styles with components
   *
   * @default 'css'
   */
  importStyle?: boolean | 'css' | 'sass'
}

export function PinosUIStyleImportResolve(options: PinosUIStyleImportResolveOptions = {}): Lib {
  return {
    libraryName: 'pinos-ui',
    esModule: true,
    resolveStyle: (name) => {
      const { importStyle = 'css' } = options
      name = toCapitalCase(name)

      if (!name.toLowerCase().startsWith(prefix.toLowerCase())) {
        return ''
      }

      name = name.slice(prefix.length)

      if (noStylesComponents.has(name))
        return ''

      name = toKebabCase(name)

      if (importStyle === 'sass')
        return `pinos-ui/styles/${name}.scss`
      else if (importStyle === true || importStyle === 'css')
        return `pinos-ui/dist/css/${name}.css`
      else
        return ''
    }
  }
}
