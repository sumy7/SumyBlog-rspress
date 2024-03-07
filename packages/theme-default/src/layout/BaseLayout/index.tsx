import { Nav } from '@rspress/theme-default'
import classnames from 'classnames'
import Footer from '@/components/Footer'

import styles from './index.module.less'

export interface BaseLayoutProps {
  children?: React.ReactNode
  outline?: React.ReactNode
}

const BaseLayout = (props: BaseLayoutProps) => {
  const { children, outline } = props
  return (
    <div>
      <Nav />
      <div className={classnames(styles.pageContainer)}>
        <div
          className={classnames('rspress-doc-container', styles.pageContent)}
        >
          {children}
        </div>
        {outline && (
          <div className={classnames(styles.rightContent)}>
            <div className={classnames(styles.asideContainer, 'sticky')}>
              {outline}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default BaseLayout
