import React from 'react'
import styles from './index.module.scss'
import { usePageData } from 'rspress/runtime'
import { PostInfo } from '../../../plugins/PostData'

const PostList = () => {
  const { page } = usePageData()
  const posts = (page.posts || []) as PostInfo[]

  return (
    <div className={`${styles.postList}`}>
      {posts.map((post, index) => (
        <div key={index} className={`${styles.postItem}`}>
          <div className={`${styles.postHeader}`}>
            <a
              className={`${styles.postTitle} text-xl font-bold text-center cursor-pointer`}
              href={post.route}
            >
              {post.title}
            </a>
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
