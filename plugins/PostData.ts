import dayjs from 'dayjs'
import { Permalink } from 'hexo-util'
import path from 'node:path'
import grayMatter from 'gray-matter'

export interface PostInfo {
  // 文章标题
  title: string
  // 文章路由
  route: string
  // 文件路径
  path: string
  // 创建时间
  date: string
  // 分类
  category: string
  // 标签
  tags: string[]
}

const fileNamePattern = ':year-:month-:day-:title.md'
const permalinkPattern = ':year/:month/:day/:title/'

const configBlogFileName = fileNamePattern.substring(
  0,
  fileNamePattern.length - path.extname(fileNamePattern).length
)
const formFileNamePermalink = new Permalink(configBlogFileName, {
  segments: {
    year: /(\d{4})/,
    month: /(\d{2})/,
    day: /(\d{2})/,
    i_month: /(\d{1,2})/,
    i_day: /(\d{1,2})/,
    hash: /([0-9a-f]{12})/,
  },
})
const toRoutePathPermalink = new Permalink(permalinkPattern)

function norminalizeCategory(category: string | string[]): string {
  if (!category) {
    return null
  }
  if (Array.isArray(category)) {
    return category[0]
  }
  return category
}

function norminalizeTags(tags: string | string[]): string[] {
  if (!tags) {
    return []
  }
  if (Array.isArray(tags)) {
    return tags
  }
  return tags.split(',')
}

export const postInfos: PostInfo[] = []

/**
 * 解析文章信息
 * @param filepath 文章路径
 * @returns
 */
export function getPostInfo(filepath: string): PostInfo | null {
  let filename = path.basename(filepath.toString())
  const extname = path.extname(filename)
  if (['.mdx', '.md', '.html'].indexOf(extname) === -1) {
    return null
  }
  // 如果文件名为index，则以文件夹名为路由
  if (filename.indexOf('index') >= 0) {
    filename = path.basename(path.dirname(filepath.toString())) + extname
  }
  const filePath = filename.substring(0, filename.length - extname.length)
  const data = formFileNamePermalink.parse(filePath)
  let routePath = `/blog/${filePath}/`
  if (data) {
    routePath = `/${toRoutePathPermalink.stringify(data)}`
  }
  // 解析文章的frontmatter
  const { data: frontmatter } = grayMatter.read(filepath)

  const createTime = dayjs(frontmatter.date) || dayjs()

  return {
    title: frontmatter.title || filename,
    route: routePath,
    path: filepath,
    date: createTime.format('YYYY-MM-DD HH:mm:ss'),
    category: norminalizeCategory(
      frontmatter.category || frontmatter.categories
    ),
    tags: norminalizeTags(frontmatter.tag || frontmatter.tags),
  }
}
