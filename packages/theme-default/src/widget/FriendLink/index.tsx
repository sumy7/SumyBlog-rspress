import { getCustomMDXComponent } from '@rspress/theme-default'
import classnames from 'classnames'
import { usePageData } from '@rspress/runtime'
import WidgetContainer from '@/widget/WidgetContainer'

const { a: CustomA } = getCustomMDXComponent()

const FriendLinkWidget = () => {
  const { siteData } = usePageData()

  return (
    <>
      {siteData.themeConfig.friendLinks && (
        <WidgetContainer title="友情链接">
          <div className={classnames('m-5')}>
            {siteData.themeConfig.friendLinks?.map((link, index) => (
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
