import { Helmet } from '@rspress/runtime'

export interface FeedsAnnotationsProps {
  href: string
}

const FeedsAnnotations: React.FC<FeedsAnnotationsProps> = ({
  href,
}: FeedsAnnotationsProps) => {
  return (
    <Helmet>
      <link rel="alternate" type="application/rss+xml" href={href} />
    </Helmet>
  )
}

export default FeedsAnnotations
