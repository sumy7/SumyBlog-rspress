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
      externals: [/@sumyblog\/.*/],
    },
    {
      buildType: 'bundle',
      format: 'esm',
      target: 'es2020',
      input: { FeedsAnnotations: './src/FeedsAnnotations.tsx' },
      autoExternal: false,
      externals: [
        'virtual-meta',
        /@rspress\/.*/,
        'react',
        'react/jsx-runtime',
        'react-dom',
        'react-router-dom',
        /@sumyblog\/.*/,
      ],
      dts: {
        respectExternal: false,
      },
      style: {
        inject: true,
      },
    },
  ],
})
