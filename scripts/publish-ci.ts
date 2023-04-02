import semver from 'semver'
import {
  args,
  getActiveVersion,
  getPackageInfo,
  publishPackage,
  run,
  step
} from './release-utils'

function getBuildStep() {
  const buildStep = new Map<string, { buildPkgName: string; buildArgs: string[] }[]>()
  buildStep.set('@pinos-ui/utils', [
    {
      buildPkgName: '@pinos-ui/utils',
      buildArgs: [
        '--filter',
        './packages/utils',
        'run',
        'build'
      ]
    }
  ])
  buildStep.set('@pinos-ui/plugins', [
    {
      buildPkgName: '@pinos-ui/utils',
      buildArgs: [
        '--filter',
        './packages/utils',
        'run',
        'build'
      ]
    },
    {
      buildPkgName: '@pinos-ui/plugins',
      buildArgs: [
        '--filter',
        './packages/plugins',
        'run',
        'build'
      ]
    }
  ])
  buildStep.set('pinos-ui', [
    {
      buildPkgName: '@pinos-ui/utils',
      buildArgs: [
        '--filter',
        './packages/utils',
        'run',
        'build'
      ]
    },
    {
      buildPkgName: 'pinos-ui',
      buildArgs: [
        '--filter',
        './packages/pinos-ui',
        'run',
        'build'
      ]
    }
  ])
  return buildStep
}

async function main() {
  const tag = args._[0]

  if (!tag)
    throw new Error('No tag specified')

  const version = tag.startsWith('v') ? tag.slice(1) : tag.replace(/@pinos-ui\/.*@/g, '')
  const versionReg = new RegExp(`@${version}`, 'g')
  const pkgName = tag.startsWith('v') ? 'pinos-ui' : tag.replace(versionReg, '')

  const { currentVersion, pkgDir } = getPackageInfo(pkgName)
  if (currentVersion !== version) {
    throw new Error(
      `Package version from tag "${version}" mismatches with current version "${currentVersion}"`
    )
  }

  const activeVersion = await getActiveVersion(pkgName)
  const buildStep = getBuildStep()

  const steps = buildStep.get(pkgName)
  if (steps && steps.length) {
    for (const s of steps) {
      const { buildPkgName, buildArgs } = s
      step(`Building ${buildPkgName} ...`)
      await run('pnpm', buildArgs)
    }
  }

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
