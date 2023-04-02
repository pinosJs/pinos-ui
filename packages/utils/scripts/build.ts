import { resolve, join } from 'node:path'
import consola from 'consola'
import { execaSync } from 'execa'
import fg from 'fast-glob'
import fs from 'fs-extra'

const dir = resolve(__dirname, '../core')
const subDirName = [
  'tools'
]
const ignoreDieName: string[] = ['common']

async function updateImport() {
  const files = await fg('*', {
    onlyDirectories: true,
    cwd: dir,
    ignore: [
      '_*',
      'dist',
      'node_modules',
      ...subDirName,
      ...ignoreDieName
    ]
  })
  let subFiles: string[] = []

  for (const n of subDirName) {
    const subDir = resolve(__dirname, `../core/${n}`)
    const pRes = await fg('*', {
      onlyFiles: true,
      cwd: subDir,
      ignore: [
        '_*',
        'types.ts'
      ]
    })
    const list = pRes.map((item) => {
      if (item.includes('.ts'))
        return `${n}/${item.split('.ts')[0]}`
      else
        return ''
    }).filter(i => i?.trim())

    subFiles = [
      ...subFiles,
      ...list
    ]
  }

  const exportFiles = files.concat(subFiles)
  exportFiles.sort()
  const imports = exportFiles.map(name => `export * from './${name}'`)

  await fs.writeFile(join(dir, 'index.ts'), `${imports.join('\n')}\n`)
}

async function build() {
  consola.info('generate import')
  await updateImport()
  consola.info('packing')
  execaSync('vite', ['build', '--config', 'vite.config.ts'], { stdio: 'inherit' })
}

async function main() {
  try {
    await build()
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main()
