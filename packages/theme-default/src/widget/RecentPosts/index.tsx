import { postInfos } from 'virtual-post-data'
import { getCustomMDXComponent } from '@rspress/theme-default'
import classnames from 'classnames'
import WidgetContainer from '@/widget/WidgetContainer'

const { a: CustomA } = getCustomMDXComponent()

const RecentPostsWidget = () => {
  return (
    <WidgetContainer title="最新文章">
      <div className={classnames('m-5')}>
        {postInfos.slice(0, 5).map((post, index) => (
          <div
            key={index}
            className={classnames(
              'mb-1',
              'overflow-hidden',
              'text-nowrap',
              'overflow-ellipsis'
            )}
          >
            <CustomA href={post.route} title={post.title}>
              {post.title}
            </CustomA>
          </div>
        ))}
      </div>
    </WidgetContainer>
  )
}

export default RecentPostsWidget
