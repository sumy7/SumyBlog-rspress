import * as path from 'path'
import { defineConfig, UserConfig } from 'rspress/config'
import { DefaultThemeConfig } from '@rspress/shared'

import { blogPostResolver } from '@sumyblog/rspress-plugin-post-resolver'
import { postReadingInfoPlugin } from '@sumyblog/rspress-plugin-reading-info'
import { googleAnalyticsPlugin } from '@sumyblog/rspress-plugin-google-analytics'
import { markdownPresetsPlugin } from '@sumyblog/rspress-plugin-markdown-presets'
import { googleAdsPlugin } from '@sumyblog/rspress-plugin-google-ads'

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
    ],
    googleAds: {
      adClient: 'ca-pub-3539958012242464',
      adSlot: {
        sidebarWidget: '3173509936',
        articleFooter: '7247705093',
      },
    },
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
    googleAdsPlugin({
      adClient: 'ca-pub-3539958012242464',
    }),
  ],
} as UserConfig<DefaultThemeConfig>)
