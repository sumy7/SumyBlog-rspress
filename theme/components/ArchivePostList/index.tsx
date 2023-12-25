import React, { useMemo } from 'react'
import { Link } from '../../index'
import { normalizeHrefInRuntime } from 'rspress/runtime'
import { PostInfo } from '../../../plugins/PostData'

import styles from './index.module.scss'

interface ArchivePostListProps {
  title?: string
  posts: PostInfo[]
}

const ArchivePostList = (props: ArchivePostListProps) => {
  const { title = '', posts = [] } = props

  // 将posts按照日期中年份进行分组，然后倒序排列
  const postsByYear = useMemo(() => {
    const postMap = new Map<string, PostInfo[]>()
    const yearList: {
      year: string
      posts: PostInfo[]
    }[] = []

    ;(posts as PostInfo[]).forEach((post) => {
      const year = post.date.slice(0, 4)
      let yearPosts = []
      if (postMap.has(year)) {
        yearPosts = postMap.get(year)
      } else {
        postMap.set(year, yearPosts)
        yearList.push({
          year,
          posts: yearPosts,
        })
      }
      yearPosts.push(post)
    })
    return yearList
  }, [posts])

  return (
    <div className="overview-index mx-auto px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl leading-10 tracking-tight">
          {title || 'Archives'}
        </h1>
      </div>
      {postsByYear.map((year) => (
        <div key={year.year} className={styles.year}>
          <h2 className={styles.yearTitle}>{year.year}</h2>
          <ul className={styles.postList}>
            {year.posts.map((post) => (
              <li key={post.route} className={`${styles.postItem} gap-5`}>
                <span className={styles.postDate}>
                  {(post.date || '').slice(0, 10)}
                </span>
                &nbsp;
                <Link
                  href={normalizeHrefInRuntime(post.route)}
                  className={`${styles.postLink}`}
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default ArchivePostList
