import React, { useMemo } from 'react'
import dayjs from 'dayjs'
import { usePageData } from '@rspress/runtime'
import { BaseRuntimePageInfo } from '@rspress/shared'
import Busuanzi from './Busuanzi'
import ClickFill from '@iconify-icons/bi/clock-fill'
import CalendarFill from '@iconify-icons/bi/calendar-fill'
import EyeFill from '@iconify-icons/bi/eye-fill'
import FileEarmarkWordFill from '@iconify-icons/bi/file-earmark-word-fill'
import FolderFill from '@iconify-icons/bi/folder-fill'
import TagFill from '@iconify-icons/bi/tag-fill'
import { Icon } from '@iconify-icon/react'

import styles from './index.module.scss'
import classnames from 'classnames'
import { Link } from '@rspress/theme-default'

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
  }, [pageData.page])

  return (
    <div className={classnames(styles.postInfoContainer, '-mt-5', 'mb-8')}>
      <span className={styles.postInfoMetaItem}>
        <Icon icon={CalendarFill} inline />{' '}
        {dayjs(postInfo.date || Date.now()).format('YYYY-MM-DD')}
      </span>
      <span className={styles.postInfoMetaItem}>
        <Icon icon={FolderFill} inline />{' '}
        <Link
          href={`/blog/categories/index.html?category=${encodeURIComponent(
            postInfo.categories?.join('/') || ''
          )}`}
        >
          {postInfo.categories?.join('/') || '未分类'}
        </Link>
      </span>
      {(postInfo.tags || []).map((tag) => (
        <span className={styles.postInfoMetaItem}>
          <Icon icon={TagFill} inline />{' '}
          <Link href={`/blog/tags/index.html?tag=${encodeURIComponent(tag)}`}>
            {tag}
          </Link>
        </span>
      ))}
      <span className={styles.postInfoMetaItem}>
        <Icon icon={FileEarmarkWordFill} inline /> {postInfo.words || 'NaN'} 字
      </span>
      <span className={styles.postInfoMetaItem}>
        <Icon icon={ClickFill} inline /> {postInfo.readingTime || 'NaN'} 分钟
      </span>
      <span className={styles.postInfoMetaItem}>
        <Icon icon={EyeFill} inline /> <Busuanzi />
      </span>
    </div>
  )
}

export default PostInfo
