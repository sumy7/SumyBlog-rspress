import React from 'react'
import { usePageData } from 'rspress/runtime'
import TagCloud from './TagCloud'

interface PageData {
  page: {
    frontmatter: Record<string, unknown>
    tagCloud: {
      name: string
      count: number
    }[]
  }
}

const Tags = () => {
  const {
    page: { frontmatter, tagCloud = [] },
  } = usePageData() as unknown as PageData

  return (
    <div>
      <TagCloud tagCloud={tagCloud} />
    </div>
  )
}

export default Tags
