import { postInfos } from 'virtual-post-data'
import { usePageData } from '@rspress/runtime'
import YearGroupedPostList from '@/components/YearGroupedPostList'
import BaseLayout from '@/layout/BaseLayout'

const ArchivesLayout = () => {
  const {
    page: { frontmatter },
  } = usePageData()

  return (
    <BaseLayout>
      <div className="overview-index mx-auto px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl leading-10 tracking-tight">
            {(frontmatter?.title as string) || 'Archives'}
          </h1>
        </div>
        <YearGroupedPostList posts={postInfos} />
      </div>
    </BaseLayout>
  )
}

export default ArchivesLayout
