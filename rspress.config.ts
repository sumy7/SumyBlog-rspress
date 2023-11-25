import * as path from 'path'
import { defineConfig } from 'rspress/config'

import { blogPostResolver } from './plugins/BlogPostResolver'

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'SumyBlog',
  description: "SumyGG's Blog",
  icon: '/favicon.ico',
  themeConfig: {
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/sumy7/' },
      { icon: 'weibo', mode: 'link', content: 'https://weibo.com/sumy7' },
      { icon: 'twitter', mode: 'link', content: 'https://twitter.com/sumygg' },
    ],
    lastUpdated: true,
    lastUpdatedText: '最后更新时间',
    prevPageText: '上一页',
    nextPageText: '下一页',
    outlineTitle: '目录',
  },
  globalUIComponents: [
    [
      path.join(__dirname, './theme', 'GoogleAnalytics.tsx'),
      {
        id: 'UA-69760423-1',
      },
    ],
  ],
  mediumZoom: {
    selector: '.rspress-doc img',
  },
  markdown: {
    // 使用 JS 版本的 MDX 编译器
    mdxRs: false,
  },
  plugins: [blogPostResolver()],
})
