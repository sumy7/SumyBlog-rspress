import { RspressPlugin } from '@rspress/shared'

import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import remarkEmoji from 'remark-gemoji'
import remarkMath from 'remark-math'

// markdown 插件集合
export function markdownPresetsPlugin(): RspressPlugin {
  return {
    name: '@sumyblog/rspress-plugin-markdown-presets',
    builderConfig: {
      html: {
        tags: [
          // katex css
          {
            tag: 'link',
            attrs: {
              href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
              rel: 'stylesheet',
              integrity:
                'sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV',
              crossOrigin: 'anonymous',
            },
          },
        ],
      },
    },
    config: (config) => {
      return {
        ...config,
        markdown: {
          // 使用 JS 版本的 MDX 编译器
          mdxRs: false,
          rehypePlugins: [
            rehypeKatex,
            [
              rehypeRaw,
              {
                passThrough: [
                  'mdxFlowExpression',
                  'mdxJsxFlowElement',
                  'mdxJsxTextElement',
                  'mdxTextExpression',
                  'mdxjsEsm',
                ],
              },
            ],
          ],
          remarkPlugins: [remarkEmoji, remarkMath],
        },
      }
    },
  }
}
