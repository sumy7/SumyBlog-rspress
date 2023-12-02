import React from 'react'
import Theme from '@rspress/theme-default'
import { Helmet } from 'rspress/runtime'
import PostFooter from './components/PostFooter'
import PostInfo from './components/PostInfo'
import Footer from './components/Footer'

import './index.scss'

const Layout = () => (
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
      beforeOutline={<PostInfo />}
      bottom={<Footer />}
    />
  </>
)

export default {
  ...Theme,
  Layout,
}

export * from '@rspress/theme-default'
