import React, { useMemo } from 'react'
import dayjs from 'dayjs'
import { usePageData } from '@rspress/runtime'
import { BaseRuntimePageInfo } from '@rspress/shared'
import Busuanzi from './Busuanzi'

import styles from './index.module.scss'

export interface PostPageData extends BaseRuntimePageInfo {
  date?: string
  categories?: string[]
  tags?: string[]
  words?: number
  readingTime?: number
}

const PostInfo = () => {
  const pageData = usePageData()
  const postInfo = useMemo(() => {
    return pageData.page as PostPageData
  }, [pageData])

  return (
    <div className={styles.postInfoContainer}>
      <div className="leading-7 block text-sm font-semibold pl-3">文章信息</div>
      <div className={`${styles.postInfoItem} block`}>
        <span className={`${styles.postInfoLabel}`}>分类：</span>
        <span className={`${styles.postInfoContent}`}>
          {(postInfo.categories || []).join(', ')}
        </span>
      </div>
      <div className={`${styles.postInfoItem} block`}>
        <span className={`${styles.postInfoLabel}`}>标签：</span>
        <span className={`${styles.postInfoContent}`}>
          {(postInfo.tags || []).join(', ')}
        </span>
      </div>
      <div className={`${styles.postInfoItem} block`}>
        <span className={`${styles.postInfoLabel}`}>发表于：</span>
        <span className={`${styles.postInfoContent}`}>
          {dayjs(postInfo.date || Date.now()).format('YYYY-MM-DD')}
        </span>
      </div>
      {postInfo.words && (
        <div className={`${styles.postInfoItem} block`}>
          <span className={`${styles.postInfoLabel}`}>字数统计：</span>
          <span className={`${styles.postInfoContent}`}>
            {postInfo.words} 字
          </span>
        </div>
      )}
      {postInfo.readingTime && (
        <div className={`${styles.postInfoItem} block`}>
          <span className={`${styles.postInfoLabel}`}>阅读时长：</span>
          <span className={`${styles.postInfoContent}`}>
            {postInfo.readingTime} 分钟
          </span>
        </div>
      )}
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
