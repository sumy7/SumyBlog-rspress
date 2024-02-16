import styles from './index.module.less'

export interface WidgetContainerProps {
  title?: string
  children?: React.ReactNode
}

const WidgetContainer = (props: WidgetContainerProps) => {
  const { title, children } = props || {}

  return (
    <div className={styles.widgetContainer}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default WidgetContainer
