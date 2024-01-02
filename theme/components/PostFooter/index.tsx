import React from 'react'
import GiscusComments from '../../GiscusComments'
import PrevNextPage from '../PrevNextPage'
import GoogleAds from '../../GoogleAds'

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
