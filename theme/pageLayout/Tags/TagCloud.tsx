import React from 'react'
import { normalizeHrefInRuntime } from 'rspress/runtime'
import { Link } from '../../index'

import styles from './index.module.scss'

const TagCloud = (props: {
  tagCloud: {
    name: string
    count: number
  }[]
}) => {
  const { tagCloud = [] } = props

  return (
    <div className={styles.tagList}>
      {tagCloud.map((item) => (
        <Link
          key={item.name}
          href={normalizeHrefInRuntime(`/blog/tags/${item.name}/index.html`)}
          className={styles.tagItem}
        >
          <span className={styles.tagName}>{item.name} </span>
          <span className={styles.tagPostCount}>{item.count}</span>
        </Link>
      ))}
    </div>
  )
}

export default TagCloud
