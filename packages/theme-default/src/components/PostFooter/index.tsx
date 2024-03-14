import { usePageData } from '@rspress/runtime'
import { useMemo } from 'react'
import GoogleAds from '@sumyblog/rspress-plugin-google-ads/dist/GoogleAds'
import styles from './index.module.scss'

import GiscusComments from '@/components/PostWidget/GiscusComments'
import PrevNextPage from '@/components/PrevNextPage'

const PostFooter = () => {
  const { siteData } = usePageData()

  const articleFooterAd = useMemo(() => {
    if (!siteData?.themeConfig?.googleAds) {
      return false
    }
    if (!siteData?.themeConfig?.googleAds?.adSlot?.articleFooter) {
      return false
    }
    return {
      adClient: siteData.themeConfig.googleAds.adClient,
      adSlot: siteData.themeConfig.googleAds.adSlot.articleFooter,
    }
  }, [])

  return (
    <div className={`${styles.postFooter} flex flex-col`}>
      <PrevNextPage />
      {articleFooterAd && (
        <GoogleAds
          dataAdClient={articleFooterAd.adClient}
          dataAdSlot={articleFooterAd.adSlot}
          dataAdFormat="auto"
          dataFullWidthResponsive="true"
        />
      )}
      {siteData?.themeConfig?.giscus && <GiscusComments />}
    </div>
  )
}

export default PostFooter
