import { Nav } from '@rspress/theme-default'
import classnames from 'classnames'
import styles from './index.module.less'
import Footer from '@/components/Footer'

export interface BaseLayoutProps {
  children?: React.ReactNode
  outline?: React.ReactNode
}

const BaseLayout = (props: BaseLayoutProps) => {
  const { children, outline } = props
  return (
    <div>
      <Nav />
      <div className={classnames(styles.docLayout, 'pt-0')}>
        <div
          className={classnames(
            styles.content,
            'rspress-doc-container',
            'flex',
            'flex-shrink-0',
            'mx-auto'
          )}
        >
          <div className="w-full">{children}</div>
          {outline && <div className={styles.asideContainer}>{outline}</div>}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default BaseLayout
