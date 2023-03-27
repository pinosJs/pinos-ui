import { noStylesComponents, prefix, toKebabCase } from './utils'

export function PinosUIBabelImportResolve() {
  return {
    libraryName: 'pinos-ui',
    transformToDefaultImport: false,
    customName: () => 'pinos-ui',
    styleLibraryDirectory: 'dist/css',
    style: (name: string) => {
      if (noStylesComponents.has(name))
        return

      if (!name.toLowerCase().startsWith(prefix.toLowerCase()))
        return ''

      name = name.slice(prefix.length)

      name = toKebabCase(name)
      return `pinos-ui/dist/css/${name}.css`
    }
  }
}
