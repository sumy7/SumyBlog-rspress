import React from 'react'
import { useSearchParams } from 'rspress/runtime'

import styles from './index.module.scss'

const TagCloud = (props: {
  tagCloud: {
    name: string
    count: number
  }[]
}) => {
  const { tagCloud = [] } = props

  const [_, setSearchParams] = useSearchParams()

  const onTagClick = (tag: string) => {
    setSearchParams({ tag })
  }

  return (
    <div className={styles.tagList}>
      {tagCloud.map((item) => (
        <a
          key={item.name}
          className={styles.tagItem}
          onClick={() => onTagClick(item.name)}
        >
          <span className={styles.tagName}>{item.name} </span>
          <span className={styles.tagPostCount}>{item.count}</span>
        </a>
      ))}
    </div>
  )
}

export default TagCloud
