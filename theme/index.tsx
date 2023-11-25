import React from 'react'
import Theme from 'rspress/theme'
import GisusComments from './GiscusComments'

const Layout = () => <Theme.Layout beforeDocFooter={<GisusComments />} />

export default {
  ...Theme,
  Layout,
}

export * from 'rspress/theme'
