import styles from './index.module.less'

export interface WidgetContainerProps {
  title?: string
  children?: React.ReactNode
}

const WidgetContainer = (props: WidgetContainerProps) => {
  const { title, children } = props || {}

  return (
    <div className={styles.widgetContainer}>
      {title && (
        <div className={styles.headerRow}>
          <div className={styles.indicator} />
          <div className={styles.title}>{title}</div>
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default WidgetContainer
