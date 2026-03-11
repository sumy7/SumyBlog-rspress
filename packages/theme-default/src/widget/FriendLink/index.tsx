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
          <div className={classnames('m-5')}>
            {themeConfig.friendLinks?.map((link: any) => (
              <div
                key={link.link + link.name}
                className={classnames(
                  'mb-1',
                  'overflow-hidden',
                  'text-nowrap',
                  'overflow-ellipsis'
                )}
              >
                <CustomA href={link.link} title={link.name} target="_blank">
                  {link.name}
                </CustomA>
              </div>
            ))}
          </div>
        </WidgetContainer>
      )}
    </>
  )
}

export default FriendLinkWidget
