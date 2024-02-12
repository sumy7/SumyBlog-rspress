import { usePageData } from '@rspress/runtime'
import { PostInfo } from '@sumyblog/rspress-plugin-post-resolver'

import ArchivePostList from './ArchivePostList'

import './index.less'

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
