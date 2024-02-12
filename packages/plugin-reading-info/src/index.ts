import { RspressPlugin } from '@rspress/shared'
import { getReadingTime } from '@/PostReadingInfo'

// 获取文章阅读时间
export function postReadingInfoPlugin(): RspressPlugin {
  return {
    name: '@sumyblog/rspress-plugin-reading-info',
    extendPageData(pageData) {
      if (pageData?.frontmatter.layout === 'post') {
        const { content } = pageData
        const readingTime = getReadingTime(content)
        pageData.readingTime = readingTime.readTime
        pageData.words = readingTime.words
      }
    },
  }
}
