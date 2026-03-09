import * as path from 'path'
import { defineConfig, UserConfig } from 'rspress/config'
import { DefaultThemeConfig } from '@rspress/shared'

import { blogPostResolver } from '@sumyblog/rspress-plugin-post-resolver'
import { postReadingInfoPlugin } from '@sumyblog/rspress-plugin-reading-info'
import { googleAnalyticsPlugin } from '@sumyblog/rspress-plugin-google-analytics'
import { markdownPresetsPlugin } from '@sumyblog/rspress-plugin-markdown-presets'
import { feedRssPlugin } from '@sumyblog/rspress-plugin-feed-rss'

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'SumyBlog',
  description: "SumyGG's Blog",
  icon: '/favicon.ico',
  builderConfig: {
    source: {
      alias: {
        '@docs': path.join(__dirname, 'docs'),
        '@source': path.join(__dirname, 'source'),
        '@theme': path.join(__dirname, 'theme'),
      },
    },
  },
  themeConfig: {
    friendLinks: [
      {
        name: '笔良文昌 - noclyt',
        link: 'https://noclyt.com/',
      },
      {
        name: '无火的余灰 - AShen One',
        link: 'https://ashenone.cn/',
      },
      {
        name: '槽 - 雨rain',
        link: 'https://miyehn.me/blog/',
      },
      {
        name: 'NAS日志 - steven',
        link: 'https://irunningm.top/',
      },
      {
        name: '乌漆嘛黑',
        link: 'https://www.chengzila.com/',
      },
    ],
    googleAds: {
      adClient: 'ca-pub-3539958012242464',
      adSlot: {
        sidebarWidget: '3173509936',
        articleFooter: '7247705093',
        beforeOutline: '2645015996',
      },
    },
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/sumy7/' },
      { icon: 'weibo', mode: 'link', content: 'https://weibo.com/sumy7' },
      { icon: 'x', mode: 'link', content: 'https://twitter.com/sumygg' },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path fill="currentColor" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm1.5 2.5c5.523 0 10 4.477 10 10a1 1 0 1 1-2 0a8 8 0 0 0-8-8a1 1 0 0 1 0-2m0 4a6 6 0 0 1 6 6a1 1 0 1 1-2 0a4 4 0 0 0-4-4a1 1 0 0 1 0-2m.5 7a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3"/></svg>',
        },
        mode: 'link',
        content: 'https://sumygg.com/rss/feed.rss',
      },
    ],
    giscus: {
      repo: 'sumy7/sumy7.github.io',
      repoId: 'MDEwOlJlcG9zaXRvcnkzNDExMDEyOQ==',
      category: 'Announcements',
      categoryId: 'DIC_kwDOAgh6sc4Ca7BZ',
    },
    // 关闭所有页面的左侧菜单栏
    sidebar: {},
    // 顶部导航栏
    nav: [
      {
        text: '友情链接',
        link: '/blog/flinks/',
        activeMatch: '/blog/flinks/',
      },
      {
        text: '归档',
        link: '/blog/archives/',
        activeMatch: '/blog/archives/',
      },
      {
        text: '分类',
        link: '/blog/categories/',
        activeMatch: '/blog/categories/',
      },
      {
        text: '标签',
        link: '/blog/tags/',
        activeMatch: '/blog/tags/',
      },
      {
        text: '关于我',
        link: '/about/',
        activeMatch: '/about/',
      },
    ],
    lastUpdated: true,
    lastUpdatedText: '最后编辑时间',
    prevPageText: '上一篇',
    nextPageText: '下一篇',
    outlineTitle: '目录',
    editLink: {
      text: '📝 在 GitHub 上编辑此页',
      docRepoBaseUrl:
        'https://github.com/sumy7/SumyBlog-rspress/blob/main/source/',
    },
    searchPlaceholderText: '搜索...',
  },
  globalUIComponents: [],
  route: {
    cleanUrls: false,
  },
  mediumZoom: {
    selector: '.rspress-doc img',
  },
  plugins: [
    blogPostResolver({
      postsDir: path.join(__dirname, 'source/_posts'),
    }),
    postReadingInfoPlugin(),
    googleAnalyticsPlugin({
      gid: 'G-2NDCXW15G4',
    }),
    markdownPresetsPlugin(),
    feedRssPlugin({
      baseUrl: 'https://sumygg.com',
    }),
  ],
} as UserConfig<DefaultThemeConfig>)
