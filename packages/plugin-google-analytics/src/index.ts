import { RspressPlugin } from '@rspress/shared'

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export interface GoogleAnalyticsPluginOptions {
  gid: string
}

// Google Analytics plugin
export function googleAnalyticsPlugin(
  options: GoogleAnalyticsPluginOptions
): RspressPlugin {
  return {
    name: '@sumyblog/rspress-plugin-google-analytics',
    builderConfig: {
      html: {
        tags: [
          // Configure Google Analytics
          {
            tag: 'script',
            attrs: {
              async: true,
              src: `https://www.googletagmanager.com/gtag/js?id=${options.gid}`,
            },
          },
          {
            tag: 'script',
            children: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${options.gid}');`,
          },
        ],
      },
    },
  }
}
