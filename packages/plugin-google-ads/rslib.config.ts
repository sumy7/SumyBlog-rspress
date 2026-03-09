import { defineConfig } from '@rslib/core'

export default defineConfig({
  source: {
    entry: {
      index: './src/index.ts',
      GoogleAds: './src/GoogleAds/index.tsx',
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
    },
  ],
})
