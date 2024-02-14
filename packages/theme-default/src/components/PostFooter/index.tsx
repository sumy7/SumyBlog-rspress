import styles from './index.module.scss'

import GiscusComments from '@/GiscusComments'
import PrevNextPage from '@/components/PrevNextPage'
import GoogleAds from '@/GoogleAds'

const PostFooter = () => {
  return (
    <div className={`${styles.postFooter} flex flex-col`}>
      <PrevNextPage />
      <GoogleAds dataAdSlot={'7247705093'} />
      <GiscusComments />
    </div>
  )
}

export default PostFooter
