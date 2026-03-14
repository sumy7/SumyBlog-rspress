import { RspressPlugin } from '@rspress/core'
import { visit } from 'unist-util-visit'
import { resolve } from 'path'

import remarkEmoji from 'remark-gemoji'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
// import rspressPluginKatex from 'rspress-plugin-katex'
import rspressPluginMermaid from 'rspress-plugin-mermaid'

const katexCssPath = resolve(
  __dirname,
  '../node_modules/katex/dist/katex.min.css'
)

const remarkCodeBlockToMath = () => {
  return (tree: any) => {
    visit(tree, 'math', (node: any) => {
      node.data = node.data || {}
      node.data.hName = 'div'
      delete node.lang
      delete node.meta
    })
    visit(tree, 'code', (node: any) => {
      if (node.lang === 'math') {
        node.data = {
          hName: 'div',
          hProperties: { className: ['math', 'math-display'] },
        }
        delete node.lang
        delete node.meta
      }
    })
  }
}

// markdown 插件集合
export function markdownPresetsPlugin(): RspressPlugin {
  return {
    name: '@sumyblog/rspress-plugin-markdown-presets',
    globalStyles: katexCssPath,
    config: (config, { addPlugin }) => {
      // addPlugin(rspressPluginKatex())
      addPlugin(rspressPluginMermaid())

      config.markdown = config.markdown || {}
      config.markdown.link = { checkDeadLinks: false }
      config.markdown.shiki = config.markdown.shiki || {}
      config.markdown.shiki.defaultLanguage = 'text'
      config.markdown.shiki.langAlias = {
        mysql: 'text',
        basic: 'text',
        smali: 'text',
        brainfuck: 'text',
        delphi: 'text',
      }

      return config
    },
    markdown: {
      remarkPlugins: [[remarkMath, {}], remarkCodeBlockToMath, remarkEmoji],
      rehypePlugins: [rehypeKatex],
    },
  }
}
