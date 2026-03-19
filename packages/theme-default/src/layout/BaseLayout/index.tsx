import { Nav } from '@rspress/core/theme-original'
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
      <div
        className={classnames(
          'mx-auto max-w-7xl flex justify-center px-6 py-12',
          styles.pageContainer
        )}
      >
        <div
          className={classnames(
            'rspress-doc-container max-w-4xl',
            styles.pageContent
          )}
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
