import { defineConfig } from '@rslib/core'

export default defineConfig({
  plugins: [],
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

