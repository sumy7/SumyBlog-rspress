import { useNavigate } from '@rspress/core/runtime'
import { postCategories } from 'virtual-post-categories'
import { useMemo } from 'react'
import { Folder } from 'lucide-react'
import WidgetContainer from '@/widget/WidgetContainer'

const CategoriesWidget = () => {
  const navigate = useNavigate()

  const sortedCategories = useMemo(() => {
    return [...postCategories].sort((a, b) => b.count - a.count)
  }, [])

  const visibleCategories = useMemo(() => {
    return sortedCategories.slice(0, 5)
  }, [sortedCategories])

  const hasMore = sortedCategories.length > 5

  return (
    <WidgetContainer title="分类">
      <div className="space-y-1">
        {visibleCategories.map((category) => (
          <button
            key={category.name}
            type="button"
            className="group flex w-full items-center justify-between gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-[var(--rp-c-bg-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rp-c-brand)]/30"
            onClick={() => {
              navigate(
                `/blog/categories/index.html?category=${encodeURIComponent(
                  category.name
                )}`
              )
            }}
          >
            <span className="flex min-w-0 items-center gap-2">
              <Folder className="h-3.5 w-3.5 shrink-0 text-[var(--rp-c-brand)]" />
              <span className="truncate text-sm text-[var(--rp-c-text-1)] group-hover:text-[var(--rp-c-brand)]">
                {category.name}
              </span>
            </span>
            <span className="shrink-0 text-xs text-[var(--rp-c-text-2)]">
              {category.count}
            </span>
          </button>
        ))}

        {hasMore && (
          <button
            type="button"
            className="group flex w-full items-center justify-center rounded-lg px-2 py-2 text-sm text-[var(--rp-c-text-2)] transition-colors hover:bg-[var(--rp-c-bg-soft)] hover:text-[var(--rp-c-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rp-c-brand)]/30"
            onClick={() => {
              navigate('/blog/categories/index.html')
            }}
          >
            more
          </button>
        )}
      </div>
    </WidgetContainer>
  )
}

export default CategoriesWidget
