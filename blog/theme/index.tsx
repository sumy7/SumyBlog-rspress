import React, { useEffect } from 'react'
import Theme from 'rspress/theme'
import { Helmet, useLocation, usePageData } from 'rspress/runtime'
import ReactGA from 'react-ga4'
import PostFooter from './components/PostFooter'
import PostInfo from './components/PostInfo'
import Footer from './components/Footer'

import './index.scss'

ReactGA.initialize('G-2NDCXW15G4')

const Layout = () => {
  const pageData = usePageData()

  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname })
  }, [location.pathname])

  return (
    <>
      <Helmet>
        {/* google adsense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3539958012242464"
          crossOrigin="anonymous"
        ></script>
        {/* katex css */}
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
