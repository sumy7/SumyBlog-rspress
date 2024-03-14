import { useMemo } from 'react'
import { usePageData } from '@rspress/runtime'
import { Layout } from '@rspress/theme-default'
import PostFooter from '@/components/PostFooter'
import Footer from '@/components/Footer'
import GoogleAds from '@sumyblog/rspress-plugin-google-ads/dist/GoogleAds'

const PostLayout = () => {
  const { siteData } = usePageData()

  const beforeOutlineAd = useMemo(() => {
    if (!siteData?.themeConfig?.googleAds) {
      return false
    }
    if (!siteData?.themeConfig?.googleAds?.adSlot?.beforeOutline) {
      return false
    }
    return {
      adClient: siteData.themeConfig.googleAds.adClient,
      adSlot: siteData.themeConfig.googleAds.adSlot.beforeOutline,
    }
  }, [])

  return (
    <Layout
      beforeDocFooter={<PostFooter />}
      beforeOutline={
        <div>
          {beforeOutlineAd && (
            <GoogleAds
              dataAdClient={beforeOutlineAd.adClient}
              dataAdSlot={beforeOutlineAd.adSlot}
              dataAdFormat={undefined}
              dataFullWidthResponsive={undefined}
              style={{
                display: 'inline-block',
                width: '268px',
                height: '100px',
                marginBottom: '1.25rem',
              }}
            />
          )}
        </div>
      }
      bottom={<Footer />}
    />
  )
}
export default PostLayout
