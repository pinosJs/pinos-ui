import { resolve } from 'node:path'
import { execa } from 'execa'
import fg from 'fast-glob'
import prompts from 'prompts'

const dir = resolve(__dirname, '../example')

async function main() {
  const files = await fg('*', {
    onlyDirectories: true,
    cwd: dir,
    ignore: [
      '_*',
      'dist',
      'node_modules'
    ]
  })
  files.sort()
  const promptsProps = {
    type: 'select',
    name: 'example',
    message: 'Please select an example to run',
    choices: files.map((item) => {
      return {
        title: item, value: item
      }
    }),
    initial: 0
  } as any

  const { example } = await prompts(promptsProps)
  const targetDir = resolve(dir, example)

  execa('pnpm', ['-C', targetDir, process.env.PLAY_MODE || 'dev'], {
    stdio: 'inherit'
  })
}

main()
