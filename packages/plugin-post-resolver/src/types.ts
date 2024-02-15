/**
 * 插件选项
 */
export interface PluginOptions {
  // 文章目录
  postsDir?: string
}

/**
 * 文章信息
 */
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

/**
 * 文章标签
 */
export interface PostTag {
  // 标签名称
  name: string
  // 标签文章数量
  count: number
  // 文章
  posts: PostInfo[]
}

/**
 * 文章分类
 */
export interface InternalPostCategory {
  // 分类名称
  name: string
  // 分类文章数量
  count: number
  // 子分类
  children: Map<string, InternalPostCategory>
  // 文章
  posts: PostInfo[]
}

export type PostCategory = InternalPostCategory & {
  children: PostCategory[]
}

// @ts-expect-error
declare module 'virtual-post-data' {
  export const postInfos: PostInfo[]
}

// @ts-expect-error
declare module 'virtual-post-categories' {
  export const postCategories: PostCategory[]
}

// @ts-expect-error
declare module 'virtual-post-tags' {
  export const postTags: PostTag[]
}
