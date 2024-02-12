import { useMemo } from 'react'
import { usePageData, useSearchParams } from '@rspress/runtime'
import { PostInfo } from '@sumyblog/rspress-plugin-post-resolver'
import ArchivePostList from './ArchivePostList'

import TagCloud from './TagCloud'

import './index.less'

interface PageData {
  page: {
    frontmatter: Record<string, unknown>
    categoriesData: {
      name: string
      count: number
      posts: PostInfo[]
    }[]
  }
}

const Tags = () => {
  const {
    page: { categoriesData = [] },
  } = usePageData() as unknown as PageData

  const [searchParams] = useSearchParams()

  const { name, posts } = useMemo(() => {
    const category = searchParams.get('category')
    if (category) {
      const categoryInfo = categoriesData.find((item) => item.name === category)
      if (categoryInfo) {
        return categoryInfo
      }
    }
    return { name: '', posts: [] }
  }, [searchParams.get('category'), categoriesData])

  return (
    <div>
      {(posts?.length || 0) <= 0 && <TagCloud tagCloud={categoriesData} />}
      {(posts?.length || 0) > 0 && (
        <ArchivePostList posts={posts} title={`${name} - 分类`} />
      )}
    </div>
  )
}

export default Tags
