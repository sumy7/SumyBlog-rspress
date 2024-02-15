import { postCategories } from 'virtual-post-categories'
import { useSearchParams } from '@rspress/runtime'
import { useMemo } from 'react'
import YearGroupedPostList from '@/components/YearGroupedPostList'
import TagCloud from '@/components/TagCloud'
import BaseLayout from '@/layout/BaseLayout'

const CategoriesLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { name, posts } = useMemo(() => {
    const category = searchParams.get('category')
    if (category) {
      const categoryInfo = postCategories.find((item) => item.name === category)
      if (categoryInfo) {
        return categoryInfo
      }
    }
    return { name: '', posts: [] }
  }, [searchParams.get('category'), postCategories])

  return (
    <BaseLayout>
      {(posts?.length || 0) === 0 && (
        <TagCloud
          tagCloud={postCategories}
          onTagClick={(category: string) => {
            setSearchParams({ category })
          }}
        />
      )}
      {(posts?.length || 0) > 0 && (
        <div className="overview-index mx-auto px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl leading-10 tracking-tight">
              {`${name} - 分类`}
            </h1>
          </div>
          <YearGroupedPostList posts={posts} />
        </div>
      )}
    </BaseLayout>
  )
}

export default CategoriesLayout
