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
title: 标签
sidebar: false
outline: false
---
import Tags from ${JSON.stringify(tagPluginPath)};

<Tags />
`,
        },
        ...Array.from(postTags.values()).map((tagInfo) => {
          return {
            routePath: `/blog/tags/${tagInfo.name}/`,
            // language=mdx
            content: `---
layout: tags
title: ${tagInfo.name} - 标签
sidebar: false
outline: false
tagName: ${tagInfo.name}
---
import Archives from ${JSON.stringify(archivePluginPath)};
 
<Archives />
`,
          }
        }),
      ]
    },
    extendPageData(pageData) {
      // 标签页面添加当前标签信息
      if (pageData?.frontmatter.layout === 'tags') {
        // 展示标签下的文章
        if (pageData?.frontmatter.tagName) {
          const tagPostInfo = postTags.get(
            pageData.frontmatter.tagName as string
          )
          pageData.posts = tagPostInfo?.posts || []
        } else {
          // 如果没有指定tagName，则展示标签云
          pageData.tagCloud = Array.from(postTags.values())
            .sort((a, b) => b.count - a.count)
            .map((item) => ({ name: item.name, count: item.count }))
        }
      }
    },
  }
}
