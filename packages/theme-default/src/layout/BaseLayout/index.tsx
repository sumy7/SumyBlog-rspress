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
      <div
        className={classnames(
          'mx-auto',
          'max-w-screen-sm',
          'lg:max-w-screen-xl',
          'xl:p-9',
          'p-6',
          'flex',
          'flex-col',
          'lg:flex-row',
          'gap-6'
        )}
      >
        <div
          className={classnames(
            'rspress-doc-container',
            'flex-1',
            'min-h-screen'
          )}
        >
          {children}
        </div>
        {outline && (
          <div className={classnames('block', 'w-full', 'lg:w-80')}>
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
