import { postTags } from 'virtual-post-tags'
import { useMemo } from 'react'
import { useNavigate } from '@rspress/core/runtime'
import WidgetContainer from '@/widget/WidgetContainer'

const TagCloudWidget = () => {
  const navigate = useNavigate()

  // 文章数量最多的前10个标签
  const highestCountTags = useMemo(() => {
    return [...postTags].sort((a, b) => b.count - a.count).slice(0, 10)
  }, [])

  return (
    <WidgetContainer title="标签云">
      <div className="flex flex-wrap gap-2">
        {highestCountTags.map((tag) => (
          <button
            key={tag.name}
            type="button"
            className="rounded-full border border-[var(--rp-c-divider)] bg-[var(--rp-c-bg-soft)]/40 px-2.5 py-1 text-xs text-[var(--rp-c-text-1)] transition-colors hover:border-[var(--rp-c-brand)]/35 hover:text-[var(--rp-c-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rp-c-brand)]/30"
            onClick={() => {
              navigate(
                `/blog/tags/index.html?tag=${encodeURIComponent(tag.name)}`
              )
            }}
          >
            # {tag.name}
          </button>
        ))}
        {postTags.length > 10 && (
          <button
            type="button"
            className="rounded-full border border-[var(--rp-c-divider)] bg-[var(--rp-c-bg-soft)]/40 px-2.5 py-1 text-xs text-[var(--rp-c-text-1)] transition-colors hover:border-[var(--rp-c-brand)]/35 hover:text-[var(--rp-c-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rp-c-brand)]/30"
            onClick={() => {
              navigate(`/blog/tags/index.html`)
            }}
          >
            +{postTags.length - 10}
          </button>
        )}
      </div>
    </WidgetContainer>
  )
}

export default TagCloudWidget
