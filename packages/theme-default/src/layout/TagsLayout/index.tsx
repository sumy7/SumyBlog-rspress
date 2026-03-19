import { postTags } from 'virtual-post-tags'
import { useSearchParams } from '@rspress/core/runtime'
import { useMemo } from 'react'
import YearGroupedPostList from '@/components/YearGroupedPostList'
import TagCloud from '@/components/TagCloud'
import BaseLayout from '@/layout/BaseLayout'

const TagsLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { name, posts } = useMemo(() => {
    const tag = searchParams.get('tag')
    if (tag) {
      const tagInfo = postTags.find((item) => item.name === tag)
      if (tagInfo) {
        return tagInfo
      }
    }
    return { name: '', posts: [] }
  }, [searchParams.get('tag')])

  return (
    <BaseLayout>
      {(posts?.length || 0) === 0 && (
        <>
          <header className="space-y-5 pb-8">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--rp-c-text-3)]">
                Tags
              </p>
              <div className="max-w-3xl space-y-3">
                <h1 className="text-3xl leading-tight tracking-tight text-[var(--rp-c-text-1)] md:text-5xl">
                  标签索引
                </h1>
              </div>
            </div>
          </header>
          <TagCloud
            tagCloud={postTags}
            onTagClick={(tag: string) => {
              setSearchParams({ tag })
            }}
          />
        </>
      )}
      {(posts?.length || 0) > 0 && (
        <div className="overview-index mx-auto px-8">
          <header className="mb-8 border-b border-[var(--rp-c-divider)] pb-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--rp-c-text-3)]">
              Tags
            </p>
            <h1 className="text-3xl leading-10 tracking-tight text-[var(--rp-c-text-1)] md:text-4xl">
              {`${name} - 标签`}
            </h1>
          </header>
          <YearGroupedPostList posts={posts} />
        </div>
      )}
    </BaseLayout>
  )
}

export default TagsLayout
