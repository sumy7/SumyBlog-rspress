import { getCustomMDXComponent } from '@rspress/core/theme-original'
import { useSite } from '@rspress/core/runtime'

import type { FriendLink } from '@/ThemeConfig'

const { a: CustomA } = getCustomMDXComponent()

export const FriendLinks = () => {
  const { site } = useSite()
  const friendLinks = (
    site?.themeConfig as { friendLinks?: FriendLink[] } | undefined
  )?.friendLinks

  if (!friendLinks?.length) {
    return null
  }

  return (
    <ul>
      {friendLinks.map((link) => (
        <li key={link.link + link.name}>
          <CustomA href={link.link} target="_blank">
            {link.name}
          </CustomA>
        </li>
      ))}
    </ul>
  )
}
