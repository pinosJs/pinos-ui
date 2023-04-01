import { resolve, join } from 'node:path'
import { prefix } from '@config/constant'
import { toCapitalCase } from '@utils/common'
import { ESLint } from 'eslint'
import fg from 'fast-glob'
import fs from 'fs-extra'

const dir = resolve(__dirname, '..')
const componentDir = resolve(__dirname, '../components')
const styleDir = resolve(__dirname, '../styles')
const ignorePropsDirs = new Set(['config-provider'])

export async function updateImport() {
  const eslint = new ESLint({ fix: true })
  const componentDirs = await fg('*', {
    onlyDirectories: true,
    cwd: componentDir,
    ignore: [
      '_*',
      'dist',
      'node_modules',
      'types'
    ]
  })

  const componentInfo = componentDirs.map(i => ({
    dirName: i,
    prefixComponentName: toCapitalCase(`${prefix}-${i}`),
    componentName: toCapitalCase(i),
    capitalCaseName: toCapitalCase(i),
    configPropsName: `${toCapitalCase(i)}ConfigProps`
  }))

  // 生成 style/index.scss
  const styleFiles = await fg('*', {
    onlyFiles: true,
    cwd: styleDir,
    ignore: [
      'index.scss'
    ]
  })
  const styleImports = styleFiles.map(name => `@use './${name}';`)
  const imports = ['@forward "./design/variables.scss";'].concat(styleImports)
  await fs.writeFile(join(styleDir, 'index.scss'), `${imports.join('\n')}\n`)

  // 生成 props.ts
  const effectPropsDirs = componentInfo.filter(data => !ignorePropsDirs.has(data.dirName))
  const importStr = effectPropsDirs.map((data) => {
    return `import type { ${data.configPropsName} } from './components/${data.dirName}'`
  }).join('\n')

  const interfaceStr = `\nexport interface PropsOptions {\n${effectPropsDirs.map((data) => {
    return `  ${data.capitalCaseName}?: ${data.configPropsName}`
  }).join('\n')}\n}`

  await fs.writeFile(join(dir, 'props.ts'), `${importStr}\n${interfaceStr}\n`)

  // 生成 index.ts
  const exportIndexStr = componentInfo.map(s => `export * from './components/${s.dirName}'`).join('\n')
  await fs.writeFile(join(dir, 'index.ts'), `${exportIndexStr}\nexport { install } from './install-all'\nexport type { PropsOptions } from './props'\n`)

  // 生成 components.ts
  const importComponentsStr = componentInfo.map((data) => {
    return `import { ${data.prefixComponentName} } from './components/${data.dirName}'`
  }).join('\n')
  const exportComponentsStr = `\nexport const components = [\n${componentInfo.map((data, index) => {
    return index === componentInfo.length - 1 ? `  ${data.prefixComponentName}` : `  ${data.prefixComponentName},`
  }).join('\n')}\n]`
  await fs.writeFile(join(dir, 'components.ts'), `${importComponentsStr}\n${exportComponentsStr}\n`)

  // types.d.ts
  const types = `
    declare module 'vue' {
      export interface GlobalComponents {
        ${componentInfo.map(data => `${data.prefixComponentName}: typeof import('pinos-ui')['${data.prefixComponentName}']`)
      .join(',\n')
    }
      }
    }

    export {}
  `
  const typesPath = join(dir, 'types.d.ts')
  await fs.writeFile(typesPath, types)
  await ESLint.outputFixes(await eslint.lintFiles(typesPath))
}
