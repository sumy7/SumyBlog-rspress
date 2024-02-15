import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { normalizeHrefInRuntime } from '@rspress/runtime'

import { PostInfo } from '@sumyblog/rspress-plugin-post-resolver'

import styles from './index.module.scss'

interface YearGroupedPostListProps {
  posts: PostInfo[]
}

const YearGroupedPostList = (props: YearGroupedPostListProps) => {
  const { posts = [] } = props

  // 将posts按照日期中年份进行分组，然后倒序排列
  const postsByYear = useMemo(() => {
    const postMap = new Map<string, PostInfo[]>()
    const yearList: {
      year: string
      posts: PostInfo[]
    }[] = []

    posts.forEach((post) => {
      const year = post.date.slice(0, 4)
      let yearPosts: PostInfo[] = []
      if (postMap.has(year)) {
        yearPosts = postMap.get(year) || []
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
    <div>
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
                  to={normalizeHrefInRuntime(post.route)}
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

export default YearGroupedPostList
