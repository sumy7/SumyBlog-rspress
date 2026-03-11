import { RspressPlugin } from '@rspress/core'
import { DeployerContext, push, setup } from './deploy'
import { cwd } from 'node:process'
import { join } from 'node:path'
import { emptyDir, existsSync, copyDir } from 'hexo-fs'

interface GitDeployerPluginOptions {
  // git 仓库地址
  repository: string
  // 部署分支
  branch: string
  // 部署信息
  message?: string
  // 部署目录
  deployDir?: string
  // git 用户名
  name?: string
  // git 邮箱
  email?: string
}

// 部署到git
export function gitDeployerPlugin(
  options: GitDeployerPluginOptions
): RspressPlugin {
  const baseDir = cwd()
  const ctx: DeployerContext = {
    url: options.repository,
    branch: options.branch,
    docDir: '',
    deployDir: options.deployDir || join(baseDir, '.git_deploy'),
    message: options.message,
    name: options.name,
    email: options.email,
  }

  return {
    name: '@sumyblog/rspress-plugin-deployer-git',
    afterBuild: async (config, isProd) => {
      if (!isProd) {
        return
      }
      ctx.docDir = config.outDir || join(baseDir, 'doc_build')
      await (async () => {
        if (existsSync(ctx.deployDir)) {
          return
        }
        console.log('Setup deploy dir...')
        await setup(ctx)
      })()
        .then(() => {
          console.log('Cleanup deploy dir...')
          return emptyDir(ctx.deployDir, { exclude: ['.git'] })
        })
        .then(() => {
          console.log('Copy doc file...')
          copyDir(ctx.docDir, ctx.deployDir)
        })
        .then(() => {
          console.log('Deploy to git...')
          return push(ctx)
        })
    },
  }
}
