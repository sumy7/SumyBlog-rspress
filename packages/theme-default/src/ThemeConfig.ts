export interface FriendLink {
  name: string
  link: string
}

export interface GoogleAds {
  adClient: string
  adSlot: {
    sidebarWidget?: string | false
    articleFooter?: string | false
  }
}

declare module '@rspress/shared' {
  interface DefaultThemeConfig {
    friendLinks?: FriendLink[]
    googleAds?: GoogleAds | false
  }
  interface UserConfig {
    foo?: string
  }
}
