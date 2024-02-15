import path from 'node:path'
import fs, { PathLike } from 'node:fs'
import { AdditionalPage, RspressPlugin } from '@rspress/shared'
import {
  addPost,
  getCategoriesArray,
  getPostInfo,
  getTagsArray,
  postInfos,
  sortPostInfos,
} from './PostData'
import { PluginOptions } from '@/types'

// 遍历文件夹
function traverseFolder(
  folderPath: PathLike,
  callback: (path: PathLike) => void
) {
  const items = fs.readdirSync(folderPath)
  items.forEach((item) => {
    const itemPath = path.join(folderPath.toString(), item)
    const stats = fs.statSync(itemPath)
    if (stats.isDirectory()) {
      traverseFolder(itemPath, callback)
    } else if (stats.isFile()) {
      callback(itemPath)
    }
  })
}

export function blogPostResolver(options?: PluginOptions): RspressPlugin {
  const { postsDir = process.cwd() } = options || {}
  return {
    name: '@sumyblog/rspress-plugin-post-resolver',
    beforeBuild() {
      // 遍历soruce/_posts目录，获取mdx、md、html文件，生成路由
      traverseFolder(postsDir, (itemPath) => {
        const postInfo = getPostInfo(itemPath as string)
        if (!postInfo) {
          return
        }
        addPost(postInfo)
      })
      sortPostInfos()
    },
    addPages() {
      const pages: AdditionalPage[] = []
      // 添加文章路由
      postInfos.forEach((postInfo) => {
        pages.push({
          routePath: postInfo.route,
          filepath: postInfo.path,
        })
      })
      return pages
    },
    extendPageData(pageData) {
      // 混入文章信息
      if (pageData?.frontmatter.layout === 'post') {
        const index = postInfos.findIndex(
          (postInfo) => postInfo.route === pageData.routePath
        )
        // 前一篇、后一篇文章
        if (index > -1) {
          pageData.prevPost = postInfos[index + 1]
          pageData.nextPost = postInfos[index - 1]
        }
        // 日期、标签、分类
        const postInfo = postInfos[index]
        pageData.date = postInfo.date
        pageData.categories = postInfo.categories
        pageData.tags = postInfo.tags
      }
    },
    addRuntimeModules() {
      return {
        'virtual-post-data': `
          export const postInfos = ${JSON.stringify(postInfos)}
        `,
        'virtual-post-categories': `
          export const postCategories = ${JSON.stringify(getCategoriesArray())}
        `,
        'virtual-post-tags': `
          export const postTags = ${JSON.stringify(getTagsArray())}
        `,
      }
    },
  }
}
