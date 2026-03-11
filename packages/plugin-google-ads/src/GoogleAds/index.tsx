import { NoSSR } from '@rspress/core/runtime'
import GoogleAds, { type GoogleAdsProps } from '@/GoogleAds/GoogleAds'

const GoogleAdsIndex: React.FC<GoogleAdsProps> = (props: GoogleAdsProps) => {
  return (
    <NoSSR>
      <GoogleAds {...props} />
    </NoSSR>
  )
}

export default GoogleAdsIndex
