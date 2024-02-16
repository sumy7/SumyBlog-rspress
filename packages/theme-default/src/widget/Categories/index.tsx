import { useNavigate } from '@rspress/runtime'
import { postCategories } from 'virtual-post-categories'
import { useMemo } from 'react'
import WidgetContainer from '@/widget/WidgetContainer'
import TagCloud from '@/components/TagCloud'

const CategoriesWidget = () => {
  const navigate = useNavigate()

  // 获取第一级的分类
  const categories = useMemo(() => {
    return postCategories.map((category) => ({ ...category, children: [] }))
  }, [])

  return (
    <WidgetContainer title="分类">
      <div>
        <TagCloud
          tagCloud={categories}
          onTagClick={(category) => {
            navigate(
              `/blog/categories/index.html?category=${encodeURIComponent(
                category
              )}`
            )
          }}
        />
      </div>
    </WidgetContainer>
  )
}

export default CategoriesWidget
