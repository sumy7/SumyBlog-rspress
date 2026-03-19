import { useMemo } from 'react'

const TagCloud = (props: {
  tagCloud: {
    name: string
    count: number
  }[]
  onTagClick: (tag: string) => void
}) => {
  const { tagCloud = [], onTagClick = () => {} } = props

  const sortedTags = useMemo(() => {
    return [...tagCloud].sort((a, b) => b.count - a.count)
  }, [tagCloud])

  const totalArticles = sortedTags.reduce((sum, tag) => sum + tag.count, 0)

  return (
    <div className="space-y-4 py-2">
      <div className="flex items-center justify-between gap-4 border-b border-[var(--rp-c-divider)] pb-3 text-sm text-[var(--rp-c-text-2)]">
        <span>{sortedTags.length} 个标签</span>
        <span>{totalArticles} 篇文章</span>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {sortedTags.map((item) => (
          <button
            key={item.name}
            type="button"
            className="group inline-flex items-center gap-1 rounded-full border border-[var(--rp-c-divider)] bg-[var(--rp-c-bg-soft)]/40 px-3 py-1.5 text-sm text-[var(--rp-c-text-1)] transition-all duration-200 hover:border-[var(--rp-c-brand)]/35 hover:text-[var(--rp-c-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rp-c-brand)]/30"
            onClick={() => onTagClick(item.name)}
          >
            <span className="text-[var(--rp-c-brand)]">#</span>
            <span>{item.name}</span>
            <span className="text-xs text-[var(--rp-c-text-2)]">
              {item.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default TagCloud
