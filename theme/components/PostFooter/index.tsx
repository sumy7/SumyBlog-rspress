import React from 'react'
import { useLocation } from 'rspress/runtime'
import GiscusComments from '../../GiscusComments'
import PrevNextPage from '../PrevNextPage'
import GoogleAds from '../../GoogleAds'

import styles from './index.module.scss'

const PostFooter = () => {
  const location = useLocation()

  return (
    <div className={`${styles.postFooter} flex flex-col`}>
      <PrevNextPage />
      <GoogleAds
        key={'google-ads-' + location.pathname}
        dataAdSlot={'7247705093'}
      />
      <GiscusComments />
    </div>
  )
}

export default PostFooter
