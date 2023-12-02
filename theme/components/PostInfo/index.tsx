import React, { useMemo } from 'react'
import dayjs from 'dayjs'
import { usePageData } from 'rspress/runtime'
import Busuanzi from './Busuanzi'

import styles from './index.module.scss'
import { BaseRuntimePageInfo } from '@rspress/shared'

export interface PostPageData extends BaseRuntimePageInfo {
  frontmatter: {
    categories?: string[]
    tags?: string[]
    date?: string
  }
  words?: number
  readingTime?: number
}

const PostInfo = () => {
  const pageData = usePageData()
  const postInfo = useMemo(() => {
    return pageData.page as PostPageData
  }, [pageData])
  console.log(pageData)

  return (
    <div className={styles.postInfoContainer}>
      <div className="leading-7 block text-sm font-semibold pl-3">文章信息</div>
      <div className={`${styles.postInfoItem} block`}>
        <span className={`${styles.postInfoLabel}`}>分类：</span>
        <span className={`${styles.postInfoContent}`}>
          {(postInfo.frontmatter.categories || []).join(', ')}
        </span>
      </div>
      <div className={`${styles.postInfoItem} block`}>
        <span className={`${styles.postInfoLabel}`}>标签：</span>
        <span className={`${styles.postInfoContent}`}>
          {(postInfo.frontmatter.tags || []).join(', ')}
        </span>
      </div>
      <div className={`${styles.postInfoItem} block`}>
        <span className={`${styles.postInfoLabel}`}>发表于：</span>
        <span className={`${styles.postInfoContent}`}>
          {dayjs((postInfo.frontmatter.date as string) || Date.now()).format(
            'YYYY-MM-DD'
          )}
        </span>
      </div>
      <div className={`${styles.postInfoItem} block`}>
        <span className={`${styles.postInfoLabel}`}>字数统计：</span>
        <span className={`${styles.postInfoContent}`}>{postInfo.words} 字</span>
      </div>
      <div className={`${styles.postInfoItem} block`}>
        <span className={`${styles.postInfoLabel}`}>阅读时长：</span>
        <span className={`${styles.postInfoContent}`}>
          {postInfo.readingTime} 分钟
        </span>
      </div>
      <div className={`${styles.postInfoItem} block`}>
        <span className={`${styles.postInfoLabel}`}>阅读量：</span>
        <span className={`${styles.postInfoContent}`}>
          <Busuanzi />
        </span>
      </div>
    </div>
  )
}

export default PostInfo
