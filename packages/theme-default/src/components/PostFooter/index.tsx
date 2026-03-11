import { usePageData } from '@rspress/core/runtime'
import styles from './index.module.scss'

import GiscusComments from '@/components/PostWidget/GiscusComments'
import PrevNextPage from '@/components/PrevNextPage'

const PostFooter = () => {
  const { siteData } = usePageData()
  const themeConfig = siteData?.themeConfig as any

  return (
    <div className={`${styles.postFooter} flex flex-col`}>
      <PrevNextPage />
      {themeConfig?.giscus && <GiscusComments />}
    </div>
  )
}

export default PostFooter
