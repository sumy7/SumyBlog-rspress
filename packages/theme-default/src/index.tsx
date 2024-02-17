import { useEffect } from 'react'
import Theme from '@rspress/theme-default'
import { Helmet, useLocation, usePageData } from '@rspress/runtime'
import { getLayout } from './layout'

import './index.scss'

const Layout = () => {
  const { siteData, page } = usePageData()
  const { pageType, lang: currentLang, title: articleTitle, frontmatter } = page
  // const defaultLang = siteData.lang || ''
  const mainTitle = siteData.title

  const location = useLocation()

  let title = (frontmatter?.title as string) ?? articleTitle
  if (title && pageType === 'doc') {
    title = `${title} - ${mainTitle}`
  } else {
    title = mainTitle
  }
  const description =
    (frontmatter?.description as string) || siteData.description

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  // 页面切换时上报页面浏览事件
  useEffect(() => {
    setTimeout(() => {
      // @ts-expect-error
      window.dataLayer.push({
        event: 'pageview',
        page: {
          url: location.pathname + location.search,
        },
      })
    })
  }, [location.pathname, location.search])

  return (
    <div>
      <Helmet
        htmlAttributes={{
          lang: currentLang || 'en',
        }}
      >
        {title ? <title>{title}</title> : null}
        {description ? <meta name="description" content={description} /> : null}
      </Helmet>
      {getLayout(pageType, (page.frontmatter?.layout as string) || '')}
    </div>
  )
}

export default {
  ...Theme,
  Layout,
}

export * from '@rspress/theme-default'
export * from './ThemeConfig'
