import * as path from 'path'
import { defineConfig } from 'rspress/config'

import { blogPostResolver } from '@sumyblog/rspress-plugin-post-resolver'
import { postReadingInfoPlugin } from '@sumyblog/rspress-plugin-reading-info'
import { googleAnalyticsPlugin } from '@sumyblog/rspress-plugin-google-analytics'
import { markdownPresetsPlugin } from '@sumyblog/rspress-plugin-markdown-presets'

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
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/sumy7/' },
      { icon: 'weibo', mode: 'link', content: 'https://weibo.com/sumy7' },
      { icon: 'twitter', mode: 'link', content: 'https://twitter.com/sumygg' },
    ],
    // 关闭所有页面的左侧菜单栏
    sidebar: {},
    // 顶部导航栏
    nav: [
      {
        text: '引导页',
        link: '/guide/',
        activeMatch: '/guide/',
      },
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
  ],
})
