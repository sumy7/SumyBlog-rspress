import fs from 'fs'
import * as glob from 'glob'
import execa from 'execa'

const scanPaths = [
  './package.json',
  './blog/package.json',
  './packages/**/package.json',
]

// 判断当前包是否需要更新依赖版本
const packageFilter = (dep: string) => {
  // rspress
  if (dep.startsWith('@rspress') || dep === 'rspress') {
    return true
  }
  // @modern-js
  if (dep.startsWith('@modern-js')) {
    return true
  }
  // 其它不获取
  return false
}

// 缓存包版本
const versionMap = new Map<string, string>()
/**
 * 获取包的版本
 * @param packageName 包名
 **/
async function fetchPackageVersion(packageName: string) {
  if (versionMap.has(packageName)) {
    return versionMap.get(packageName)
  }
  console.log(`fetching ${packageName} version...`)
  // @ts-expect-error
  const { stdout } = await execa('pnpm', ['info', packageName, 'version'])
  const version = stdout.trim()
  versionMap.set(packageName, version)
  console.log(`fetched ${packageName} version: ${version}`)
  return version
}

// 所有目录，找到package.json文件，然后更新包版本
async function run() {
  for (const scanPath of scanPaths) {
    const pkgPaths = glob.sync(scanPath, {
      ignore: ['**/node_modules/**'],
    })
    for (const pkgPath of pkgPaths) {
      console.log(`updating ${pkgPath}...`)
      const pkgObj = fs.readFileSync(pkgPath, 'utf-8')
      const pkg = JSON.parse(pkgObj)
      if (pkg.dependencies) {
        for (const dep of Object.keys(pkg.dependencies)) {
          if (packageFilter(dep)) {
            pkg.dependencies[dep] = await fetchPackageVersion(dep)
          }
        }
      }
      if (pkg.devDependencies) {
        for (const dep of Object.keys(pkg.devDependencies)) {
          if (packageFilter(dep)) {
            pkg.devDependencies[dep] = await fetchPackageVersion(dep)
          }
        }
      }

      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
    }
  }
}

run()
  .then(() => {
    console.log('done!')
  })
  .catch((e) => {
    console.error(e)
    // eslint-disable-next-line no-process-exit
    process.exit(1)
  })
