import { postInfos } from 'virtual-post-data'
import { usePage } from '@rspress/core/runtime'
import { useMemo } from 'react'
import YearGroupedPostList from '@/components/YearGroupedPostList'
import BaseLayout from '@/layout/BaseLayout'

const ArchivesLayout = () => {
  const {
    page: { frontmatter },
  } = usePage()

  const yearCount = useMemo(() => {
    return new Set(postInfos.map((post) => post.date.slice(0, 4))).size
  }, [])

  return (
    <BaseLayout>
      <div className="overview-index mx-auto w-full max-w-4xl px-4 pb-16 pt-6 md:px-8">
        <header className="mb-8 border-b border-[var(--rp-c-divider)] pb-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--rp-c-text-3)]">
            Timeline
          </p>
          <h1 className="text-3xl leading-10 tracking-tight text-[var(--rp-c-text-1)] md:text-4xl">
            {(frontmatter?.title as string) || 'Archives'}
          </h1>

          <p className="mt-3 text-sm text-[var(--rp-c-text-2)] md:text-base">
            共 {postInfos.length} 篇文章，跨越 {yearCount} 年。
          </p>
        </header>

        <YearGroupedPostList posts={postInfos} showSummary />
      </div>
    </BaseLayout>
  )
}

export default ArchivesLayout
