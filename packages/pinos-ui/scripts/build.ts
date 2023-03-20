import consola from 'consola'
import { execaSync } from 'execa'
import { updateImport } from './generate-import'

async function build() {
  consola.info('Generate import')
  updateImport()
  consola.info('Building ...')
  execaSync('vite', ['build', '--config', 'vite.config.ts'], { stdio: 'inherit' })
  consola.info('Building style ...')
  execaSync('pnpm', ['run', 'build:style'], { stdio: 'inherit' })
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
