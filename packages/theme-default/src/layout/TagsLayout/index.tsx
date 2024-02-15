import { postTags } from 'virtual-post-tags'
import { useSearchParams } from '@rspress/runtime'
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
        <TagCloud
          tagCloud={postTags}
          onTagClick={(tag: string) => {
            setSearchParams({ tag })
          }}
        />
      )}
      {(posts?.length || 0) > 0 && (
        <div className="overview-index mx-auto px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl leading-10 tracking-tight">
              {`${name} - 标签`}
            </h1>
          </div>
          <YearGroupedPostList posts={posts} />
        </div>
      )}
    </BaseLayout>
  )
}

export default TagsLayout
