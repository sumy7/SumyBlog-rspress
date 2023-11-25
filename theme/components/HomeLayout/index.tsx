import React from 'react'
import PostList from '../PostList'
import styles from './index.module.scss'

const HomeLayout = () => {
  return (
    <div className={`${styles.homeLayout} container mx-auto px-16`}>
      <PostList />
    </div>
  )
}

export default HomeLayout
