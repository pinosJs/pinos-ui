import { prefix } from '~/pinos-ui/config/constant'
import { toKebabCase } from '~/pinos-ui/utils/common'

export function PinosUIBabelImportResolve() {
  return {
    libraryName: 'pinos-ui',
    transformToDefaultImport: false,
    customName: () => 'pinos-ui',
    styleLibraryDirectory: 'dist/css',
    style: (name: string) => {
      if (!name.startsWith(prefix))
        return ''

      name = name.slice(prefix.length)

      name = toKebabCase(name)
      return `pinos-ui/dist/css/${name}.css`
    }
  }
}
