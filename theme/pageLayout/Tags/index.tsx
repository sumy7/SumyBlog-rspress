import React, { useMemo } from 'react'
import { usePageData, useSearchParams } from 'rspress/runtime'
import TagCloud from './TagCloud'
import { PostInfo } from '@plugins/PostData'
import ArchivePostList from '@theme/components/ArchivePostList'

interface PageData {
  page: {
    frontmatter: Record<string, unknown>
    tagCloud: {
      name: string
      count: number
      posts: PostInfo[]
    }[]
  }
}

const Tags = () => {
  const {
    page: { frontmatter, tagCloud = [] },
  } = usePageData() as unknown as PageData

  const [searchParams] = useSearchParams()

  const { name, posts } = useMemo(() => {
    const tag = searchParams.get('tag')
    if (tag) {
      const tagInfo = tagCloud.find((item) => item.name === tag)
      if (tagInfo) {
        return tagInfo
      }
    }
    return { name: '', posts: [] }
  }, [searchParams.get('tag'), tagCloud])

  return (
    <div>
      {(posts?.length || 0) <= 0 && <TagCloud tagCloud={tagCloud} />}
      {(posts?.length || 0) > 0 && (
        <ArchivePostList
          posts={posts}
          title={`${name} - 标签`}
        ></ArchivePostList>
      )}
    </div>
  )
}

export default Tags
