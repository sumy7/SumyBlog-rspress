import { useEffect, Fragment } from 'react'
import Theme from '@rspress/theme-default'
import { getCustomMDXComponent as getRspressMDXComponent } from '@rspress/theme-default'
import { Helmet, useLocation, usePageData } from '@rspress/runtime'
import { getLayout } from './layout'
import PostInfo from '@/components/PostInfo'

import './index.scss'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Shanghai')

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

// 覆写h1，支持在h1下方插入文章的基本信息
export const getCustomMDXComponent = (): any => {
  const CustomMDXComponent = getRspressMDXComponent()

  return {
    ...CustomMDXComponent,
    h1: (props: any) => {
      const { page } = usePageData()
      const { frontmatter } = page
      return (
        <Fragment>
          <CustomMDXComponent.h1 {...props} />
          {frontmatter?.layout === 'post' && <PostInfo />}
        </Fragment>
      )
    },
  }
}

export * from '@rspress/theme-default'
export * from './ThemeConfig'
