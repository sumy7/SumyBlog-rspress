import path from 'path'
import fs from 'fs'
import * as glob from 'glob'

const root = path.resolve(__dirname, '..')
const workspaces = ['./blog', './packages']

// 遍历blog和packages下的所有目录，找到package.json文件，然后更新包版本
async function run(basePath: string, newVersion: string) {
  glob.sync(`${basePath}/**/package.json`).forEach((pkgPath) => {
    if (pkgPath.includes('node_modules')) {
      return
    }
    console.log('process', pkgPath)
    const pkgObj = fs.readFileSync(pkgPath, 'utf-8')
    const pkg = JSON.parse(pkgObj)
    if (pkg.dependencies) {
      for (const dep of Object.keys(pkg.dependencies)) {
        if (dep.startsWith('@rspress') || dep == 'rspress') {
          pkg.dependencies[dep] = newVersion
        }
      }
    }
    if (pkg.devDependencies) {
      for (const dep of Object.keys(pkg.devDependencies)) {
        if (dep.startsWith('@rspress') || dep == 'rspress') {
          pkg.devDependencies[dep] = newVersion
        }
      }
    }

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
  })
}

async function updateRspressVersion(newVersion: string) {
  for (const workspace of workspaces) {
    await run(path.join(root, workspace), newVersion)
  }
}

// 命令行第一个参数为版本号
const newVersion = process.argv[2]
if (!newVersion) {
  console.log('请输入新版本号')
  // eslint-disable-next-line no-process-exit
  process.exit(1)
}
updateRspressVersion(newVersion)
  .then(() => {
    console.log('更新完成')
  })
  .catch((e) => {
    console.error(e)
    // eslint-disable-next-line no-process-exit
    process.exit(1)
  })
