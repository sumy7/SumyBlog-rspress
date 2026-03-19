import { useMemo } from 'react'
import { ArrowUpRight, FileText, Folder } from 'lucide-react'
import type { PostCategory } from '@sumyblog/rspress-plugin-post-resolver'

interface CategoryListProps {
  categories: PostCategory[]
  onCategoryClick: (category: string) => void
}

const CategoryList = (props: CategoryListProps) => {
  const { categories = [], onCategoryClick } = props

  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => b.count - a.count)
  }, [categories])

  const totalArticles = useMemo(() => {
    return sortedCategories.reduce((sum, category) => sum + category.count, 0)
  }, [sortedCategories])

  return (
    <div className="space-y-4 py-2">
      <div className="flex items-center justify-between gap-4 border-b border-[var(--rp-c-divider)] pb-3 text-sm text-[var(--rp-c-text-2)]">
        <span>{sortedCategories.length} 个分类</span>
        <span>{totalArticles} 篇文章</span>
      </div>

      <div className="divide-y divide-[var(--rp-c-divider)] rounded-xl border border-[var(--rp-c-divider)] bg-[var(--rp-c-bg-soft)]/35">
        {sortedCategories.map((category) => (
          <button
            key={category.name}
            type="button"
            className="group flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors duration-200 hover:bg-[var(--rp-c-bg-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--rp-c-brand)]/30"
            onClick={() => onCategoryClick(category.name)}
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <Folder className="h-4 w-4 shrink-0 text-[var(--rp-c-brand)]" />
              <span className="truncate text-sm text-[var(--rp-c-text-1)] transition-colors duration-200 group-hover:text-[var(--rp-c-brand)] md:text-base">
                {category.name}
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-2 text-xs text-[var(--rp-c-text-2)] md:text-sm">
              <FileText className="h-3.5 w-3.5" />
              <span>{category.count}</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryList
