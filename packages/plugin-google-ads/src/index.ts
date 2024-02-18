import { RspressPlugin } from '@rspress/shared'

// google 广告
export function googleAdsPlugin(): RspressPlugin {
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
              src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`,
              crossorigin: 'anonymous',
            },
          },
        ],
      },
    },
  }
}
