import React, { useEffect } from 'react'
import { Helmet, useLocation, usePageData } from 'rspress/runtime'

import busuanzi = require('busuanzi.pure.js')

// 博客统计
const Busuanzi = () => {
  const location = useLocation()
  const pageData = usePageData()

  // 页面切换时刷新数据
  useEffect(() => {
    if (pageData.page?.frontmatter.layout === 'post') {
      busuanzi.fetch()
    }
  }, [location.pathname, pageData.page?.frontmatter])

  return (
    <>
      <Helmet>
        <meta name="referrer" content="no-referrer-when-downgrade" />
      </Helmet>
      <span id="busuanzi_container_page_pv" style={{ display: 'none' }}>
        <span id="busuanzi_value_page_pv" /> 次
      </span>
    </>
  )
}

export default Busuanzi
