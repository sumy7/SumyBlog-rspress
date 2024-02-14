import { usePageData, normalizeHrefInRuntime } from '@rspress/runtime'
import { PostInfo } from '@sumyblog/rspress-plugin-post-resolver'

import { Link, useLocaleSiteData } from '@rspress/theme-default'

import styles from './index.module.scss'

const PrevNextPage = () => {
  const { prevPageText = 'Previous Page', nextPageText = 'Next page' } =
    useLocaleSiteData()
  const { page } = usePageData()
  const prevPost = page.prevPost as PostInfo
  const nextPost = page.nextPost as PostInfo

  return (
    <div className="flex flex-col sm:flex-row sm:justify-around gap-4 pt-6">
      <div className={`${styles.prev} flex flex-col`}>
        {prevPost ? (
          <Link
            href={normalizeHrefInRuntime(prevPost.route)}
            className={styles.pagerLink}
          >
            <span className={styles.desc}>{prevPageText}</span>
            <span className={styles.title}>{prevPost.title}</span>
          </Link>
        ) : null}
      </div>
      <div className={`${styles.next} flex flex-col`}>
        {nextPost ? (
          <Link
            href={normalizeHrefInRuntime(nextPost.route)}
            className={`${styles.pagerLink} ${styles.next}`}
          >
            <span className={styles.desc}>{nextPageText}</span>
            <span className={styles.title}>{nextPost.title}</span>
          </Link>
        ) : null}
      </div>
    </div>
  )
}

export default PrevNextPage
