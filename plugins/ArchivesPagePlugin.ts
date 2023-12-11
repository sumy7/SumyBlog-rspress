import { RspressPlugin } from '@rspress/shared'
import { postInfos } from './PostData'
import path from 'node:path'

const archivePluginPath = path.join(__dirname, '../theme/components/Archives')

// 归档页面
export function archivesPagePlugin(): RspressPlugin {
  return {
    name: 'archives-page',
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
