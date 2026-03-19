import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { normalizeHrefInRuntime } from '@rspress/core/runtime'

import { PostInfo } from '@sumyblog/rspress-plugin-post-resolver'

interface YearGroupedPostListProps {
  posts: PostInfo[]
  showSummary?: boolean
}

const YearGroupedPostList = (props: YearGroupedPostListProps) => {
  const { posts = [], showSummary = false } = props

  const formatMonthDay = (date: string) => {
    if (date.length >= 10) {
      return date.slice(5, 10)
    }
    return date
  }

  // 按发布时间降序分组，保证每年与每年内文章顺序稳定
  const postsByYear = useMemo(() => {
    const grouped = new Map<string, PostInfo[]>()
    const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date))

    sortedPosts.forEach((post) => {
      const year = post.date.slice(0, 4) || '未知'
      const yearPosts = grouped.get(year)
      if (yearPosts) {
        yearPosts.push(post)
        return
      }
      grouped.set(year, [post])
    })

    return Array.from(grouped.entries()).map(([year, yearPosts]) => ({
      year,
      posts: yearPosts,
    }))
  }, [posts])

  const totalCount = posts.length

  return (
    <div className="space-y-10">
      {postsByYear.map((yearInfo) => (
        <section key={yearInfo.year} className="relative">
          <div className="mb-3 flex items-end justify-between border-b border-[var(--rp-c-divider)] pb-2">
            <h2 className="font-mono text-2xl font-bold tracking-tight text-[var(--rp-c-text-1)] md:text-3xl">
              {yearInfo.year}
            </h2>
            <span className="text-xs text-[var(--rp-c-text-2)] md:text-sm">
              {yearInfo.posts.length} 篇
            </span>
          </div>

          <ul>
            {yearInfo.posts.map((post) => (
              <li key={post.route}>
                <Link
                  to={normalizeHrefInRuntime(post.route)}
                  className="group flex items-start gap-4 border-b border-[var(--rp-c-divider)]/70 py-3 transition-colors duration-200 hover:bg-[var(--rp-c-bg-soft)]/50 md:gap-6 md:py-4"
                >
                  <time className="w-14 shrink-0 font-mono text-sm text-[var(--rp-c-text-2)] md:w-16">
                    {formatMonthDay(post.date)}
                  </time>

                  <span className="flex-1 text-sm text-[var(--rp-c-text-1)] transition-colors duration-200 group-hover:text-[var(--rp-c-brand)] md:text-base">
                    {post.title}
                  </span>

                  <span
                    aria-hidden
                    className="shrink-0 text-[var(--rp-c-text-3)] opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {showSummary && (
        <div className="border-t border-[var(--rp-c-divider)] pt-8 text-center">
          <p className="text-sm text-[var(--rp-c-text-2)]">
            共 {totalCount} 篇文章，持续记录中...
          </p>
        </div>
      )}
    </div>
  )
}

export default YearGroupedPostList
