import { resolve, join } from 'node:path'
import fg from 'fast-glob'
import fs from 'fs-extra'
import { prefix } from '../config/constant'
import { UpperCamelCase } from '../utils/utils'

const dir = resolve(__dirname, '..')
const packageDir = resolve(__dirname, '../packages')
const styleDir = resolve(__dirname, '../styles')
const ignorePropsDirs = new Set(['config-provider'])

export async function updateImport() {
  const packageDirs = await fg('*', {
    onlyDirectories: true,
    cwd: packageDir,
    ignore: [
      '_*',
      'dist',
      'node_modules',
      'types'
    ]
  })

  // 生成 style/index.scss
  const styleFiles = await fg('*', {
    onlyFiles: true,
    cwd: styleDir,
    ignore: [
      'index.scss'
    ]
  })
  const styleImports = styleFiles.map(name => `@use './${name}';`)

  await fs.writeFile(join(styleDir, 'index.scss'), `${styleImports.join('\n')}\n`)

  // 生成 props.ts
  const UpperCaseDirs = packageDirs.map(s => UpperCamelCase(s))

  const filterPropsDirs = packageDirs.filter(name => !ignorePropsDirs.has(name))
  const UpperCasePropsDirs = filterPropsDirs.map(s => UpperCamelCase(s))
  const importStr = UpperCasePropsDirs.map((name, index) => {
    const pathName = filterPropsDirs[index]
    return `import type { ${name}ConfigProps } from './packages/${pathName}'`
  }).join('\n')

  const interfaceStr = `\nexport interface PropsOptions {\n${UpperCasePropsDirs.map((name) => {
    return `  ${name}?: ${name}ConfigProps`
  }).join('\n')}\n}`

  await fs.writeFile(join(dir, 'props.ts'), `${importStr}\n${interfaceStr}\n`)

  // 生成 index.ts
  const exportIndexStr = packageDirs.map(s => `export * from './packages/${s}'`).join('\n')
  await fs.writeFile(join(dir, 'index.ts'), `${exportIndexStr}\nexport { install } from './install-all'\nexport type { PropsOptions } from './props'\n`)

  // 生成 components.ts
  const importComponentsStr = UpperCaseDirs.map((name, index) => {
    const pathName = packageDirs[index]
    return `import { ${UpperCamelCase(`${prefix}-${name}`)} } from './packages/${pathName}'`
  }).join('\n')
  const exportComponentsStr = `\nexport const components = [\n${UpperCaseDirs.map((name, index) => {
    return index === UpperCaseDirs.length - 1 ? `  ${UpperCamelCase(`${prefix}-${name}`)}` : `  ${UpperCamelCase(`${prefix}-${name}`)},`
  }).join('\n')}\n]`
  await fs.writeFile(join(dir, 'components.ts'), `${importComponentsStr}\n${exportComponentsStr}\n`)
}
