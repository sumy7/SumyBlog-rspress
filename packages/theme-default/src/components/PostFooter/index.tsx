import { usePageData } from '@rspress/runtime'
import styles from './index.module.scss'

import GiscusComments from '@/components/PostWidget/GiscusComments'
import PrevNextPage from '@/components/PrevNextPage'

const PostFooter = () => {
  const { siteData } = usePageData()

  return (
    <div className={`${styles.postFooter} flex flex-col`}>
      <PrevNextPage />
      {siteData?.themeConfig?.giscus && <GiscusComments />}
    </div>
  )
}

export default PostFooter
