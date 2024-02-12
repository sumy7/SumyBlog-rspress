export interface PluginOptions {
  // 文章目录
  postsDir?: string
}

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
  categories: string[]
  // 标签
  tags: string[]
}

export interface PostTag {
  // 标签名称
  name: string
  // 标签数量
  count: number
  // 文章
  posts: PostInfo[]
}
