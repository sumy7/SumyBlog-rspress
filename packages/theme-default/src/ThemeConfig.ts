export interface FriendLink {
  name: string
  link: string
}

declare module '@rspress/shared' {
  interface DefaultThemeConfig {
    friendLinks?: FriendLink[]
  }
  interface UserConfig {
    foo?: string
  }
}
