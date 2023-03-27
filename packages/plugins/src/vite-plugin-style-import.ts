import { noStylesComponents, prefix, toKebabCase } from './utils'
import type { Lib } from 'vite-plugin-style-import'

export interface PinosUIStyleImportResolveOptions {
  /**
   * import css or sass styles with components
   *
   * @default 'css'
   */
  importStyle?: boolean | 'css' | 'sass'
}

export function PinosUIStyleImportResolve(options: PinosUIStyleImportResolveOptions): Lib {
  return {
    libraryName: 'pinos-ui',
    esModule: true,
    resolveStyle: (name) => {
      const { importStyle = 'css' } = options
      if (noStylesComponents.has(name))
        return ''

      if (!name.toLowerCase().startsWith(prefix.toLowerCase()))
        return ''

      name = name.slice(prefix.length)

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
