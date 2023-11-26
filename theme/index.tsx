import React from 'react'
import Theme from '@rspress/theme-default'
import PostFooter from './components/PostFooter'
import Footer from './components/Footer'

import './index.scss'

const Layout = () => (
  <Theme.Layout beforeDocFooter={<PostFooter />} bottom={<Footer />} />
)

export default {
  ...Theme,
  Layout,
}

export * from '@rspress/theme-default'
