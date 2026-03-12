import { postInfos } from 'virtual-post-data'
import { getCustomMDXComponent } from '@rspress/core/theme-original'
import classnames from 'classnames'
import WidgetContainer from '@/widget/WidgetContainer'

const { a: CustomA } = getCustomMDXComponent()

const RecentPostsWidget = () => {
  return (
    <WidgetContainer title="最新文章">
      <ul className={classnames('flex', 'flex-col', 'gap-0.5', 'py-0.5')}>
        {postInfos.slice(0, 5).map((post, index) => (
          <li key={index}>
            <CustomA
              href={post.route}
              title={post.title}
              className={classnames(
                'flex',
                'items-center',
                'gap-1.5',
                'px-2',
                'py-1.5',
                'rounded-md',
                'text-sm',
                'truncate',
                'transition-colors',
                'hover:bg-[var(--rp-c-bg-soft)]'
              )}
            >
              <span className="text-[var(--rp-c-brand)] text-xs shrink-0">
                ›
              </span>
              <span className="truncate text-[var(--rp-c-text-2)]">
                {post.title}
              </span>
            </CustomA>
          </li>
        ))}
      </ul>
    </WidgetContainer>
  )
}

export default RecentPostsWidget
