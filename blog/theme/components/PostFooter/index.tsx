import React from 'react'
import GiscusComments from '@theme/GiscusComments'
import PrevNextPage from '@theme/components/PrevNextPage'
import GoogleAds from '@theme/GoogleAds'

import styles from './index.module.scss'

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
