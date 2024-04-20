import path from 'node:path'
import { writeFile, mkdir } from 'node:fs/promises'
import execa from 'execa'
import dayjs from 'dayjs'

export interface DeployerContext {
  // 部署仓库
  url: string
  // 部署分支
  branch: string
  // 文章地址
  docDir: string
  // 部署目录
  deployDir: string
  // 部署信息
  message?: string
  // git 用户名
  name?: string
  // git 邮箱
  email?: string
}

/**
 * 执行git命令
 */
export async function git(ctx: DeployerContext, ...args: any[]) {
  console.log('git', args.join(' '))
  return execa('git', args, {
    cwd: ctx.deployDir,
    stdio: 'inherit',
  })
}

/**
 * 设置git用户名和邮箱
 * @param ctx
 */
async function setGitNameMail(ctx: DeployerContext) {
  ctx.name && (await git(ctx, 'config', 'user.name', ctx.name))
  ctx.email && (await git(ctx, 'config', 'user.email', ctx.email))
}

/**
 * 获取commit message
 */
export function getCommitMessage(ctx: DeployerContext) {
  return ctx.message || `site update: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`
}

/**
 * 初始化部署文件夹
 * @param context
 */
export async function setup(context: DeployerContext) {
  await mkdir(context.deployDir, { recursive: true })
  await writeFile(path.resolve(context.deployDir, '.gitkeep'), '')
  await git(context, 'init')
  await setGitNameMail(context)
  await git(context, 'add', '-A')
  await git(context, 'commit', '-m', 'first commit')
}

/**
 * 推送到git
 * @param context
 */
export async function push(context: DeployerContext) {
  await setGitNameMail(context)
  await git(context, 'add', '-A')
  await git(context, 'commit', '-m', getCommitMessage(context)).catch(() => {
    // do nothing
  })
  await git(
    context,
    'push',
    '-u',
    context.url,
    `HEAD:${context.branch}`,
    '--force'
  )
}
