import React from 'react'
import { Link } from 'rspress/theme'
import { usePageData, normalizeHrefInRuntime } from 'rspress/runtime'
import { PostInfo } from '../../../plugins/PostData'

import styles from './index.module.scss'

const PostList = () => {
  const { page } = usePageData()
  const posts = (page.posts || []) as PostInfo[]

  return (
    <div className={`${styles.postList}`}>
      {posts.map((post, index) => (
        <div key={index} className={`${styles.postItem}`}>
          <div className={`${styles.postHeader}`}>
            <Link
              className={`${styles.postTitle} text-xl font-bold cursor-pointer`}
              href={normalizeHrefInRuntime(post.route)}
            >
              {post.title}
            </Link>
          </div>
          <div className={`${styles.postInfo}`}>
            <div className={`${styles.postDate} text-sm`}>
              {(post.date || '').slice(0, 10)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostList
