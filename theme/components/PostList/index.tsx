import React from 'react'
import { normalizeHrefInRuntime } from 'rspress/runtime'
import { Link } from '../../index'
import { PostInfo } from '../../../plugins/PostData'

import styles from './index.module.scss'
import classnames from 'classnames'

interface PostListProps {
  posts: PostInfo[]
}

const PostList = ({ posts = [] }: PostListProps) => {
  return (
    <div className={`${styles.postList}`}>
      {posts.map((post, index) => (
        <div key={index} className={classnames('mt-6')}>
          <div
            className={classnames(
              styles.postItem,
              'max-w-4xl px-10 py-6 mx-auto rounded-lg'
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-light text-gray-600">
                {(post.date || '').slice(0, 10)}
              </span>
              <span
                className={classnames(
                  styles.postCategories,
                  'px-2 py-1 text-gray-100'
                )}
              >
                # {(post.categories || []).join(' / ')}
              </span>
            </div>
            <div className="mt-2">
              <Link
                className={classnames(
                  styles.postTitle,
                  'text-2xl',
                  'font-bold'
                )}
                href={normalizeHrefInRuntime(post.route)}
              >
                {post.title}
              </Link>
              <p className="mt-2 text-gray-600"></p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostList
