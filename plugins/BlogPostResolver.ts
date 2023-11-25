import { AdditionalPage, RspressPlugin } from '@rspress/shared'
import path from 'node:path'
import fs, { PathLike } from 'node:fs'
import { getPostInfo, postInfos } from './PostData'
import dayjs from 'dayjs'

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

export function blogPostResolver(): RspressPlugin {
  return {
    name: 'blog-post-resolver',
    beforeBuild() {
      // 遍历soruce/_posts目录，获取mdx、md、html文件，生成路由
      const postsDir = path.join(__dirname, '../source/_posts')
      traverseFolder(postsDir, (itemPath) => {
        const postInfo = getPostInfo(itemPath as string)
        if (!postInfo) {
          return
        }
        postInfos.push(postInfo)
      })
      postInfos.sort((a, b) => {
        return dayjs(b.date).unix() - dayjs(a.date).unix()
      })
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
      // 添加归档页面
      pages.push({
        routePath: '/blog/archives/',
        filepath: path.join(__dirname, '../source/archives.mdx'),
      })

      return pages
    },
    extendPageData(pageData) {
      // 归档页面添加文章列表
      if (pageData?.frontmatter.layout === 'archives') {
        pageData.posts = postInfos
      }
    },
  }
}
