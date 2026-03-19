import { defineConfig } from '@rslib/core'
import { pluginReact } from '@rsbuild/plugin-react'
import tailwindcss from '@tailwindcss/postcss'

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: {
      index: './src/index.ts',
      FunctionalMemos: './src/FunctionalMemos/index.tsx',
    },
  },
  lib: [
    {
      bundle: true,
      syntax: 'es2022',
      format: 'esm',
      experiments: {
        advancedEsm: true,
      },
      dts: {
        bundle: true,
      },
      output: {
        injectStyles: true,
        target: 'web',
      },
    },
  ],
  tools: {
    postcss: {
      postcssOptions: {
        plugins: [tailwindcss()],
      },
    },
  },
})
