// 参考 vite 源码
import { existsSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { execa } from 'execa'
import fs from 'fs-extra'
import minimist from 'minimist'
import colors from 'picocolors'
import semver from 'semver'
import type { Options as ExecaOptions, ExecaReturnValue } from 'execa'
import type { ReleaseType } from 'semver'

interface Pkg {
  name: string
  version: string
  private?: boolean
}

interface VersionChoice {
  title: string
  value: string
}

const pkgPrefix = '@pinos'

export function getPkgDirName(pkgName: string) {
  return pkgName.split(pkgPrefix)[1]
}

export const packages = ['@pinos/eslint-config', '@pinos/prettier-config', '@pinos/stylelint-config']

export const args = minimist(process.argv.slice(2))

export const isDryRun = !!args.dry

if (isDryRun) {
  console.log(colors.inverse(colors.yellow(' DRY RUN ')))
  console.log()
}

export async function run(
  bin: string,
  args: string[],
  opts: ExecaOptions<string> = {}
): Promise<ExecaReturnValue<string>> {
  return execa(bin, args, { stdio: 'inherit', ...opts })
}

export async function dryRun(
  bin: string,
  args: string[],
  opts?: ExecaOptions<string>
): Promise<void> {
  return console.log(
    colors.blue(`[dryrun] ${bin} ${args.join(' ')}`),
    opts || ''
  )
}

export const runIfNotDry = isDryRun ? dryRun : run

export async function getLatestTag(pkgName: string) {
  const tags = (await run('git', ['tag'], { stdio: 'pipe' })).stdout
    .split(/\n/)
    .filter(Boolean)
  const prefix = `${pkgName}@`
  // 获取最后一个tag
  return tags
    .filter(tag => tag.startsWith(prefix))
    .sort()
    .reverse()[0]
}

export async function logRecentCommits(pkgName: string) {
  const tag = await getLatestTag(pkgName)
  if (!tag)
    return

  // 获取tag commit的节点的commitId
  // git rev-list 按时间顺序倒序列出提交对象
  const sha = await run('git', ['rev-list', '-n', '1', tag], {
    stdio: 'pipe'
  }).then(res => res.stdout.trim())
  console.log(
    colors.bold(
      `\n${colors.blue('i')} Commits of ${colors.green(
        pkgName
      )} since ${colors.green(tag)} ${colors.gray(`(${sha.slice(0, 5)})`)}`
    )
  )

  // 输出某个包的tag对应的commit节点（不包含该节点）到最新的commit节点记录
  await run(
    'git',
    [
      '--no-pager',
      'log',
      `${sha}..HEAD`,
      '--oneline',
      '--',
      `packages/${getPkgDirName(pkgName)}`
    ],
    { stdio: 'inherit' }
  )
}

export function getPackageInfo(pkgName: string): {
  pkg: Pkg
  pkgName: string
  pkgDir: string
  pkgPath: string
  currentVersion: string
} {
  const pkgDir = path.resolve(__dirname, `../packages/${getPkgDirName(pkgName)}`)

  if (!existsSync(pkgDir))
    throw new Error(`Package ${pkgName} not found`)

  const pkgPath = path.resolve(pkgDir, 'package.json')
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pkg: Pkg = require(pkgPath)
  const currentVersion = pkg.version

  if (pkg.private)
    throw new Error(`Package ${pkgName} is private`)

  return {
    pkg,
    pkgName,
    pkgDir,
    pkgPath,
    currentVersion
  }
}

// 选择要发布的版本
export function getVersionChoices(currentVersion: string): VersionChoice[] {
  // alpha: 一般是内部测试使用
  // beta: 公开测试版, 已经消除了软件中大部分的不完善之处，但仍有可能还存在缺陷和漏洞，一般只提供给特定的用户群来测试使用
  // rc: 该版本功能不再增加，和最终发布版功能一样。这个版本有点像最终发行版之前的一个类似 预览版
  // stable: 稳定版。在开源软件中，都有stable版，这个就是开源软件的最终发行版，用户可以放心大胆的用了
  const currentBeta = currentVersion.includes('beta')
  const currentAlpha = currentVersion.includes('alpha')
  const isStable = !currentBeta && !currentAlpha

  function inc(i: ReleaseType, tag = currentAlpha ? 'alpha' : 'beta') {
    /**
     * semver.inc('1.2.3', 'prerelease', 'beta')
     * '1.2.4-beta.0'
    */
    return semver.inc(currentVersion, i, tag)!
  }

  let versionChoices: VersionChoice[] = [
    {
      title: 'next',
      value: inc(isStable ? 'patch' : 'prerelease')
    }
  ]

  if (isStable) {
    versionChoices.push(
      {
        title: 'beta-minor',
        value: inc('preminor')
      },
      {
        title: 'beta-major',
        value: inc('premajor')
      },
      {
        title: 'alpha-minor',
        value: inc('preminor', 'alpha')
      },
      {
        title: 'alpha-major',
        value: inc('premajor', 'alpha')
      },
      {
        title: 'minor',
        value: inc('minor')
      },
      {
        title: 'major',
        value: inc('major')
      }
    )
  } else if (currentAlpha) {
    versionChoices.push({
      title: 'beta',
      value: `${inc('patch')}-beta.0`
    })
  } else {
    versionChoices.push({
      title: 'stable',
      value: inc('patch')
    })
  }
  versionChoices.push({ value: 'custom', title: 'custom' })

  versionChoices = versionChoices.map((i) => {
    i.title = `${i.title} (${i.value})`
    return i
  })

  return versionChoices
}

export function step(msg: string) {
  return console.log(colors.cyan(msg))
}

export function updateVersion(pkgPath: string, version: string): void {
  const pkg = fs.readJSONSync(pkgPath)
  pkg.version = version
  writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)
}

export async function getActiveVersion(pkgName: string): Promise<string> {
  try {
    return (await run('npm', ['info', pkgName, 'version'], { stdio: 'pipe' }))
      .stdout
  } catch {
    return ''
  }
}

export async function publishPackage(
  pkdDir: string,
  tag?: string
): Promise<void> {
  const publicArgs = ['publish', '--access', 'public']
  if (tag)
    publicArgs.push('--tag', tag)

  await runIfNotDry('npm', publicArgs, {
    cwd: pkdDir
  })
}
