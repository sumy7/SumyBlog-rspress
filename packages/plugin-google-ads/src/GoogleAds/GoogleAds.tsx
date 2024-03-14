import { useEffect } from 'react'

export interface GoogleAdsProps {
  dataAdClient: string
  dataAdSlot: string
  dataAdFormat?: 'auto'
  dataFullWidthResponsive?: 'true'
  style?: React.CSSProperties
  className?: string
}

const GoogleAds: React.FC<GoogleAdsProps> = ({
  dataAdClient,
  dataAdSlot,
  dataAdFormat,
  dataFullWidthResponsive,
  style = {},
  className = '',
}: GoogleAdsProps) => {
  useEffect(() => {
    // @ts-expect-error
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  }, [])

  return (
    <>
      <ins
        className={`adsbygoogle ${className}`}
        style={{ display: 'block', ...style }}
        data-ad-client={dataAdClient}
        data-ad-slot={dataAdSlot}
        // data-adtest="on"
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive}
      ></ins>
    </>
  )
}

export default GoogleAds
