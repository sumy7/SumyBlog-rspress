import path from 'node:path'
import { RspressPlugin } from '@rspress/shared'
import { postTags } from './PostData'

const tagPluginPath = path.join(__dirname, '../theme/pageLayout/Tags')
const archivePluginPath = path.join(__dirname, '../theme/pageLayout/Archives')

// 标签页面
export function tagsPagePlugin(): RspressPlugin {
  return {
    name: 'tags-page',
    addPages() {
      return [
        {
          routePath: '/blog/tags/',
          // language=mdx
          content: `---
layout: tags
title: 标签云
sidebar: false
outline: false
---
import Tags from ${JSON.stringify(tagPluginPath)};

<Tags />
`,
        },
      ]
    },
    extendPageData(pageData) {
      // 标签页面添加当前标签信息
      if (pageData?.frontmatter.layout === 'tags') {
        // 封装标签云数据
        pageData.tagCloud = Array.from(postTags.values())
          .sort((a, b) => b.count - a.count)
          .map((item) => ({
            name: item.name,
            count: item.count,
            posts: postTags.get(item.name)?.posts || [],
          }))
      }
    },
  }
}
