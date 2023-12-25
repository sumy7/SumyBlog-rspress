import React, { useEffect } from 'react'
import Theme from 'rspress/theme'
import { Helmet, useLocation, usePageData } from 'rspress/runtime'
import PostFooter from './components/PostFooter'
import PostInfo from './components/PostInfo'
import Footer from './components/Footer'

import './index.scss'

const Layout = () => {
  const pageData = usePageData()

  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      {/* katex css */}
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
          integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV"
          crossOrigin="anonymous"
        />
      </Helmet>
      <Theme.Layout
        beforeDocFooter={<PostFooter />}
        beforeOutline={
          pageData.page.frontmatter.layout === 'post' && <PostInfo />
        }
        bottom={<Footer />}
      />
    </>
  )
}
export default {
  ...Theme,
  Layout,
}

export * from 'rspress/theme'
