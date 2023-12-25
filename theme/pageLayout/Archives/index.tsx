import React from 'react'
import { usePageData } from 'rspress/runtime'
import { PostInfo } from '../../../plugins/PostData'

import ArchivePostList from '../../components/ArchivePostList'

const Archives = () => {
  const {
    page: { frontmatter, posts = [] },
  } = usePageData()

  return (
    <ArchivePostList
      posts={posts as PostInfo[]}
      title={frontmatter.title as string}
    />
  )
}

export default Archives
