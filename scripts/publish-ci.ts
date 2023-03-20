import semver from 'semver'
import {
  args,
  getActiveVersion,
  getPackageInfo,
  publishPackage,
  run,
  step
} from './release-utils'

async function main() {
  const tag = args._[0]

  if (!tag)
    throw new Error('No tag specified')

  const version = tag.replace(/@pinos\/.*@/g, '')
  const versionReg = new RegExp(`@${version}`, 'g')
  const pkgName = tag.replace(versionReg, '')

  const { currentVersion, pkgDir } = getPackageInfo(pkgName)
  if (currentVersion !== version) {
    throw new Error(
      `Package version from tag "${version}" mismatches with current version "${currentVersion}"`
    )
  }

  const activeVersion = await getActiveVersion(pkgName)

  step(`Building ${pkgName} ...`)
  const buildArgs = [
    '--filter',
    `./packages/${pkgDir}`,
    'run',
    'build'
  ]
  await run('pnpm', buildArgs)

  step('Publishing package...')
  const releaseTag = version.includes('beta')
    ? 'beta'
    : (version.includes('alpha')
        ? 'alpha'
        // eslint-disable-next-line unicorn/no-nested-ternary
        : activeVersion && semver.lt(currentVersion, activeVersion)
          ? 'previous'
          : undefined)
  await publishPackage(pkgDir, releaseTag)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
