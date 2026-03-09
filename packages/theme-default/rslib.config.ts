import { defineConfig } from '@rslib/core'
import { pluginLess } from '@rsbuild/plugin-less'
import { pluginSass } from '@rsbuild/plugin-sass'
import { pluginReact } from '@rsbuild/plugin-react'
import tailwindcss from 'tailwindcss'

const COMMON_EXTERNALS = [
  /virtual-.*/,
  /@rspress\/.*/,
  'react',
  'react/jsx-runtime',
  'react-dom',
  'react-router-dom',
  'react-ga4',
  '@giscus/react',
  /@sumyblog\/.*/,
]

export default defineConfig({
  source: {
    entry: {
      index: './src/**/*',
    },
  },
  plugins: [pluginReact(), pluginSass(), pluginLess()],
  output: {
    externals: COMMON_EXTERNALS,
  },
  lib: [
    {
      outBase: './src',
      bundle: false,
      format: 'esm',
      syntax: 'esnext',
      output: {
        externals: COMMON_EXTERNALS,
        target: 'web',
      },
    },
  ],
  tools: {
    postcss: {
      postcssOptions: {
        plugins: [
          tailwindcss({
            content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
          }),
        ],
      },
    },
  },
})
