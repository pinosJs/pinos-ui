import consola from 'consola'
import { execaSync } from 'execa'

async function build() {
  consola.info('Building ...')
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
