import { RspressPlugin } from '@rspress/shared'

export interface GoogleAdsPluginOptions {
  adClient: string
}

// google 广告
export function googleAdsPlugin(
  options: GoogleAdsPluginOptions
): RspressPlugin {
  return {
    name: '@sumyblog/rspress-plugin-google-ads',
    builderConfig: {
      html: {
        tags: [
          // Configure Google Ads
          {
            tag: 'script',
            attrs: {
              async: true,
              crossorigin: 'anonymous',
              src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${options.adClient}`,
            },
          },
        ],
      },
    },
  }
}
