import { postTags } from 'virtual-post-tags'
import { useMemo } from 'react'
import { useNavigate } from '@rspress/runtime'
import WidgetContainer from '@/widget/WidgetContainer'
import TagCloud from '@/components/TagCloud'

const TagCloudWidget = () => {
  const navigate = useNavigate()

  // 文章数量最多的前10个标签
  const highestCountTags = useMemo(() => {
    return postTags.sort((a, b) => b.count - a.count).slice(0, 10)
  }, [])

  return (
    <WidgetContainer title="标签云">
      <div>
        <TagCloud
          tagCloud={highestCountTags}
          onTagClick={(tag) => {
            navigate(`/blog/tags/index.html?tag=${encodeURIComponent(tag)}`)
          }}
        />
      </div>
    </WidgetContainer>
  )
}

export default TagCloudWidget
