import { useSearchParams } from '@rspress/runtime'

import styles from './tags-cloud.module.scss'

const TagCloud = (props: {
  tagCloud: {
    name: string
    count: number
  }[]
}) => {
  const { tagCloud = [] } = props

  const [_, setSearchParams] = useSearchParams()

  const onCategoryClick = (category: string) => {
    setSearchParams({ category })
  }

  return (
    <div className={styles.tagList}>
      {tagCloud.map((item) => (
        <a
          key={item.name}
          className={styles.tagItem}
          onClick={() => onCategoryClick(item.name)}
        >
          <span className={styles.tagName}>{item.name} </span>
          <span className={styles.tagPostCount}>{item.count}</span>
        </a>
      ))}
    </div>
  )
}

export default TagCloud
