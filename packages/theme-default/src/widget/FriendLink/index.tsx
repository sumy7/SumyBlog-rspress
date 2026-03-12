import { getCustomMDXComponent } from '@rspress/core/theme-original'
import classnames from 'classnames'
import { usePageData } from '@rspress/core/runtime'
import WidgetContainer from '@/widget/WidgetContainer'

const { a: CustomA } = getCustomMDXComponent()

const FriendLinkWidget = () => {
  const { siteData } = usePageData()
  const themeConfig = siteData.themeConfig as any

  return (
    <>
      {themeConfig.friendLinks && (
        <WidgetContainer title="友情链接">
          <ul className={classnames('flex', 'flex-col', 'gap-0.5', 'py-0.5')}>
            {themeConfig.friendLinks?.map((link: any) => (
              <li key={link.link + link.name}>
                <CustomA
                  href={link.link}
                  title={link.name}
                  target="_blank"
                  className={classnames(
                    'flex',
                    'items-center',
                    'gap-1.5',
                    'px-2',
                    'py-1.5',
                    'rounded-md',
                    'text-sm',
                    'transition-colors',
                    'hover:bg-[var(--rp-c-bg-soft)]'
                  )}
                >
                  <span className="text-[var(--rp-c-brand)] text-xs shrink-0">
                    ↗
                  </span>
                  <span className="truncate text-[var(--rp-c-text-2)]">
                    {link.name}
                  </span>
                </CustomA>
              </li>
            ))}
          </ul>
        </WidgetContainer>
      )}
    </>
  )
}

export default FriendLinkWidget
