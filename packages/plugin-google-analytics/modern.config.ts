import { moduleTools, defineConfig } from '@modern-js/module-tools'
import { tailwindcssPlugin } from '@modern-js/plugin-tailwindcss'

export default defineConfig({
  plugins: [moduleTools(), tailwindcssPlugin()],
  // buildPreset: 'npm-library',
  buildConfig: [
    {
      buildType: 'bundle',
      format: 'cjs',
      sourceMap: true,
      input: ['./src/index.ts'],
      target: 'es2020',
      dts: {
        respectExternal: false,
      },
    },
  ],
})
