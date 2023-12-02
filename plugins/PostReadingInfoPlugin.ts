import { RspressPlugin } from '@rspress/shared'
import { getReadingTime } from '../theme/utils/PostReadingInfo'

// 获取文章阅读时间
export function postReadingInfoPlugin(): RspressPlugin {
  return {
    name: 'post-reading-info',
    extendPageData(pageData) {
      if (pageData?.frontmatter.layout === 'post') {
        const content = pageData.content
        const readingTime = getReadingTime(content)
        pageData.readingTime = readingTime.readTime
        pageData.words = readingTime.words
      }
    },
  }
}
