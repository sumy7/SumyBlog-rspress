import Giscus, { GiscusProps } from '@giscus/react'
import { useLocation, usePageData, useDark } from '@rspress/runtime'
import { useMemo } from 'react'

const defaultGiscusOptions = {
  repo: '',
  repoId: '',
  category: '',
  categoryId: '',
  mapping: 'pathname',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'top',
  lang: 'zh-CN',
}

export default function GiscusComments() {
  const location = useLocation()
  const { siteData } = usePageData()
  const isDark = useDark()

  const giscusOptions = useMemo(() => {
    if (!siteData?.themeConfig?.giscus) {
      return false
    }
    return {
      ...defaultGiscusOptions,
      ...siteData.themeConfig.giscus,
    } as GiscusProps
  }, [])

  return (
    <>
      {giscusOptions && (
        <Giscus
          id="comments"
          {...giscusOptions}
          term={location.pathname}
          theme={isDark ? 'dark' : 'light'}
        />
      )}
    </>
  )
}
