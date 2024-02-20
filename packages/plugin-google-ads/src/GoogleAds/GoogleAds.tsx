import { useEffect } from 'react'

export interface GoogleAdsProps {
  dataAdClient: string
  dataAdSlot: string
}

const GoogleAds: React.FC<GoogleAdsProps> = ({
  dataAdClient,
  dataAdSlot,
}: GoogleAdsProps) => {
  useEffect(() => {
    // @ts-expect-error
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  }, [])

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={dataAdClient}
        data-ad-slot={dataAdSlot}
        // data-adtest="on"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  )
}

export default GoogleAds