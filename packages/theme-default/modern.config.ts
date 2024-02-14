import { moduleTools, defineConfig } from '@modern-js/module-tools'
import { tailwindcssPlugin } from '@modern-js/plugin-tailwindcss'

const COMMON_EXTERNALS = [
  /virtual-.*/,
  /@rspress\/.*/,
  'react',
  'react/jsx-runtime',
  'react-dom',
  'react-router-dom',
  'react-ga4',
  '@giscus/react',
  '@sumyblog/rspress-plugin-post-resolver',
]

export default defineConfig({
  plugins: [moduleTools(), tailwindcssPlugin()],
  // buildPreset: 'npm-library',
  buildConfig: [
    {
      input: {
        bundle: './src/index.tsx',
      },
      copy: {
        patterns: [
          {
            from: './.theme-entry.js',
            to: './index.js',
            context: __dirname,
          },
          {
            from: './.theme-entry.d.ts',
            to: './index.d.ts',
            context: __dirname,
          },
        ],
      },
      outDir: 'dist',
      sourceMap: true,
      format: 'esm',
      externals: COMMON_EXTERNALS,
    },
  ],
})
