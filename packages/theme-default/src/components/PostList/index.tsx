import { normalizeHrefInRuntime } from '@rspress/core/runtime'
import { PostInfo } from '@sumyblog/rspress-plugin-post-resolver'
import { Link } from '@rspress/core/theme-original'
import styles from './index.module.scss'

interface PostListProps {
  posts: PostInfo[]
}

const PostList = ({ posts = [] }: PostListProps) => {
  return (
    <div className={styles.postList}>
      {posts.map((post, index) => (
        <article key={index} className={styles.postItem}>
          <div className={styles.postMeta}>
            <span className={styles.postDate}>
              {(post.date || '').slice(0, 10)}
            </span>
            {(post.categories || []).length > 0 && (
              <Link
                className={styles.postCategory}
                href={`/blog/categories/index.html?category=${encodeURIComponent(
                  post.categories?.join('/') || ''
                )}`}
              >
                {(post.categories || []).join(' / ')}
              </Link>
            )}
          </div>
          <Link
            className={styles.postTitle}
            href={normalizeHrefInRuntime(post.route)}
          >
            {post.title}
          </Link>
          {post.excerpt && <p className={styles.postExcerpt}>{post.excerpt}</p>}
          <div className={styles.postFooter}>
            <div className={styles.postTags}>
              {(post.tags || []).slice(0, 4).map((tag) => (
                <span key={tag} className={styles.postTag}>
                  {tag}
                </span>
              ))}
            </div>
            <Link
              className={styles.readMore}
              href={normalizeHrefInRuntime(post.route)}
            >
              阅读全文 →
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}

export default PostList
