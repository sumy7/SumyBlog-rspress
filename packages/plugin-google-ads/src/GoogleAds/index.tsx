export interface GoogleAdsProps {
  dataAdClient: string
  dataAdSlot: string
}

const GoogleAds: React.FC<GoogleAdsProps> = ({
  dataAdClient,
  dataAdSlot,
}: GoogleAdsProps) => {
  return (
    <>
      {/* @ts-expect-error */}
      <amp-ad
        width="100vw"
        height="320"
        type="adsense"
        data-ad-client={dataAdClient}
        data-ad-slot={dataAdSlot}
        data-auto-format="rspv"
        data-full-width=""
      >
        {/* @ts-expect-error */}
        <div overflow=""></div>
        {/* @ts-expect-error */}
      </amp-ad>
    </>
  )
}

export default GoogleAds
