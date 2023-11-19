import * as path from 'path';
import { defineConfig } from 'rspress/config';

import { blogPostResolver } from './plugins/BlogPostResolver';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'SumyBlog',
  description: 'SumyGG\'s Blog',
  // icon: "/rspress-icon.png",
  // logo: {
  //   light: "/rspress-light-logo.png",
  //   dark: "/rspress-dark-logo.png",
  // },
  themeConfig: {
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/sumy7/' },
    ],
    lastUpdated: true,
    lastUpdatedText: '最后更新时间',
    prevPageText: '上一页',
    nextPageText: '下一页',
  },
  mediumZoom: {
    selector: '.rspress-doc img',
  },
  markdown: {
    // 使用 JS 版本的 MDX 编译器
    mdxRs: false,
  },
  plugins: [blogPostResolver()]
});
