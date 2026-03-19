import { postCategories } from 'virtual-post-categories'
import { useSearchParams } from '@rspress/core/runtime'
import { useMemo } from 'react'
import CategoryList from '@/components/CategoryList'
import YearGroupedPostList from '@/components/YearGroupedPostList'
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
  }, [searchParams])

  return (
    <BaseLayout>
      {(posts?.length || 0) === 0 && (
        <>
          <header className="space-y-5 pb-8">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--rp-c-text-3)]">
                Categories
              </p>
              <div className="max-w-3xl space-y-3">
                <h1 className="text-3xl leading-tight tracking-tight text-[var(--rp-c-text-1)] md:text-5xl">
                  分类索引
                </h1>
              </div>
            </div>
          </header>
          <CategoryList
            categories={postCategories}
            onCategoryClick={(category: string) => {
              setSearchParams({ category })
            }}
          />
        </>
      )}
      {(posts?.length || 0) > 0 && (
        <div className="overview-index mx-auto px-8">
          <header className="mb-8 border-b border-[var(--rp-c-divider)] pb-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--rp-c-text-3)]">
              Categories
            </p>
            <h1 className="text-3xl leading-10 tracking-tight text-[var(--rp-c-text-1)] md:text-4xl">
              {`${name} - 分类`}
            </h1>
          </header>
          <YearGroupedPostList posts={posts} />
        </div>
      )}
    </BaseLayout>
  )
}

export default CategoriesLayout
