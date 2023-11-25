import React from 'react'
import Theme from 'rspress/theme'
import GisusComments from './GiscusComments'
import Footer from './components/Footer'

import './index.scss'

const Layout = () => (
  <Theme.Layout beforeDocFooter={<GisusComments />} bottom={<Footer />} />
)

export default {
  ...Theme,
  Layout,
}

export * from 'rspress/theme'
