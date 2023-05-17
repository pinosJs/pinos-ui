import { deleteAsync } from 'del'

async function main() {
  const deletedDirectoryPaths = await deleteAsync(['packages/**/dist'])
  console.log('Deleted directories:\n', deletedDirectoryPaths.join('\n'))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
