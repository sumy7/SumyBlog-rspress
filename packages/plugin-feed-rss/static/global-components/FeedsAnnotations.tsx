import { Head } from '@rspress/core/runtime'

export interface FeedsAnnotationsProps {
  href: string
}

const FeedsAnnotations: React.FC<FeedsAnnotationsProps> = ({
  href,
}: FeedsAnnotationsProps) => {
  return (
    <Head>
      <link rel="alternate" type="application/rss+xml" href={href} />
    </Head>
  )
}

export default FeedsAnnotations
