import { noStylesComponents, prefix, toKebabCase, toCapitalCase } from './utils'

export function PinosUIBabelImportResolve() {
  return {
    libraryName: 'pinos-ui',
    transformToDefaultImport: false,
    customName: () => 'pinos-ui',
    styleLibraryDirectory: 'dist/css',
    style: (name: string) => {
      name = toCapitalCase(name)
      name = name.slice(prefix.length)

      if (noStylesComponents.has(name))
        return

      name = toKebabCase(name)
      return `pinos-ui/dist/css/${name}.css`
    }
  }
}
