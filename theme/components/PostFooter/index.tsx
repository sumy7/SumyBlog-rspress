import React from 'react'
import GiscusComments from '../../GiscusComments'
import PrevNextPage from '../PrevNextPage'

import styles from './index.module.scss'

const PostFooter = () => {
  return (
    <div className={`${styles.postFooter} flex flex-col`}>
      <PrevNextPage />
      <GiscusComments />
    </div>
  )
}

export default PostFooter
