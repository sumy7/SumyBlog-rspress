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
      externals: ['@sumyblog/rspress-plugin-post-resolver'],
    },
    {
      buildType: 'bundle',
      format: 'esm',
      target: 'es2020',
      dts: false,
      input: ['./src/CategoriesPage/CategoriesPage.tsx'],
      autoExternal: false,
      externals: [
        'virtual-meta',
        /@rspress\/.*/,
        'react',
        'react/jsx-runtime',
        'react-dom',
        'react-router-dom',
      ],
      style: {
        inject: true,
      },
    },
  ],
})
