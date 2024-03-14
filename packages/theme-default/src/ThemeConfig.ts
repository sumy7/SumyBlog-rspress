import { GiscusProps } from '@giscus/react'

export interface FriendLink {
  name: string
  link: string
}

export interface GoogleAds {
  adClient: string
  adSlot: {
    sidebarWidget?: string | false
    articleFooter?: string | false
    beforeOutline?: string | false
  }
}

export type GiscusOptions = GiscusProps

declare module '@rspress/shared' {
  interface DefaultThemeConfig {
    friendLinks?: FriendLink[]
    googleAds?: GoogleAds | false
    giscus?: Partial<GiscusOptions> | false
  }
  interface UserConfig {
    foo?: string
  }
}
