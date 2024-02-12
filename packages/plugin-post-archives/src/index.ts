import path from 'node:path'
import { RspressPlugin } from '@rspress/shared'
import { postInfos } from '@sumyblog/rspress-plugin-post-resolver'

const archivePluginPath = path.join(__dirname, '../dist/ArchivesPage.js')

// 归档页面
export function archivesPagePlugin(): RspressPlugin {
  return {
    name: '@sumyblog/rspress-plugin-post-archives',
    addPages() {
      return [
        {
          routePath: '/blog/archives/',
          // language=mdx
          content: `---
layout: archives
title: 归档
sidebar: false
outline: false
---
import Archives from ${JSON.stringify(archivePluginPath)};

<Archives />
`,
        },
      ]
    },
    extendPageData(pageData) {
      // 归档页面添加文章列表
      if (pageData?.frontmatter.layout === 'archives') {
        pageData.posts = postInfos
      }
    },
  }
}
