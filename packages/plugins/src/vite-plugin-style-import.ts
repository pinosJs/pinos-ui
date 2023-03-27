import type { Lib } from 'vite-plugin-style-import'
import { prefix } from '~/pinos-ui/config/constant'
import { toKebabCase } from '~/pinos-ui/utils/common'

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
