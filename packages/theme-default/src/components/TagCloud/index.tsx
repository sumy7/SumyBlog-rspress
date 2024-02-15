import styles from './index.module.scss'

const TagCloud = (props: {
  tagCloud: {
    name: string
    count: number
  }[]
  onTagClick: (tag: string) => void
}) => {
  const { tagCloud = [], onTagClick = () => {} } = props

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
