import path from 'node:path'
import { mkdir, writeFile } from 'node:fs/promises'
import { RspressPlugin } from '@rspress/shared'
import { postInfos } from '@sumyblog/rspress-plugin-post-resolver'
import { Feed, FeedOptions } from 'feed'
import dayjs from 'dayjs'

const feedsAnnotationsComponent = path.resolve(
  __dirname,
  '../dist/FeedsAnnotations.js'
)

export type UserFeedOptions = Partial<
  Omit<FeedOptions, 'title' | 'copyright' | 'id'>
>

export interface FeedRssPluginOptions {
  baseUrl: string
  outDir?: string
  rssPublicPath?: string
  rssFileName?: string
  feedOptions?: UserFeedOptions
}

// 生成 rss 插件
export function feedRssPlugin({
  baseUrl,
  outDir,
  rssPublicPath = '/rss/',
  rssFileName = 'feed',
  feedOptions,
}: FeedRssPluginOptions): RspressPlugin {
  return {
    name: '@sumyblog/rspress-plugin-feed-rss',
    globalUIComponents: [
      [
        feedsAnnotationsComponent,
        {
          href: `${baseUrl}${rssPublicPath}${rssFileName}.rss`,
        },
      ],
    ],
    afterBuild: async (config) => {
      const feed = new Feed({
        id: baseUrl,
        link: baseUrl,
        title: config.title!,
        copyright: config.themeConfig?.footer?.message || '',
        description: config.description,
        ...feedOptions,
      })
      for (const post of postInfos) {
        feed.addItem({
          title: post.title,
          id: post.route,
          link: `${baseUrl}${post.route}`,
          description: post.excerpt,
          date: dayjs(post.date).toDate(),
        })
      }
      const toOutDir = path.resolve(
        outDir || `${config.outDir || 'doc_build'}/rss/`
      )
      await mkdir(toOutDir, { recursive: true })
      await writeFile(path.resolve(toOutDir, `${rssFileName}.rss`), feed.rss2())
    },
  }
}
