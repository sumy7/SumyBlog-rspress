import Giscus from '@giscus/react'
import { useLocation } from '@rspress/runtime'

export default function Comments() {
  const location = useLocation()

  return (
    <Giscus
      id="comments"
      repo="sumy7/sumy7.github.io"
      repoId="MDEwOlJlcG9zaXRvcnkzNDExMDEyOQ=="
      category="Announcements"
      categoryId="DIC_kwDOAgh6sc4Ca7BZ"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="preferred_color_scheme"
      lang="zh-CN"
      term={location.pathname}
    />
  )
}
