import path from 'node:path'
import { RspressPlugin } from '@rspress/shared'
import { postCategories } from '@sumyblog/rspress-plugin-post-resolver'

const categoriesPluginPath = path.join(__dirname, '../dist/CategoriesPage.js')

// 分类页面
export function categoriesPagePlugin(): RspressPlugin {
  return {
    name: '@sumyblog/rspress-plugin-post-categories',
    addPages() {
      return [
        {
          routePath: '/blog/categories/',
          // language=mdx
          content: `---
layout: categories
title: 分类
sidebar: false
outline: false
---
import Categories from ${JSON.stringify(categoriesPluginPath)};

<Categories />
`,
        },
      ]
    },
    extendPageData(pageData) {
      // 分类页面添加当前分类信息
      if (pageData?.frontmatter.layout === 'categories') {
        // 封装分类数据，只封装第一层分类
        pageData.categoriesData = Array.from(postCategories.values())
          .sort((a, b) => b.count - a.count)
          .map((item) => ({
            name: item.name,
            count: item.count,
            posts: postCategories.get(item.name)?.posts || [],
          }))
      }
    },
  }
}
