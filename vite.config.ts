import { builtinModules } from 'node:module'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'

const external = [
  ...builtinModules,
  ...builtinModules.map(module => `node:${module}`),
  '@koa/cors',
  '@koa/router',
  'jsonwebtoken',
  'koa',
  'koa-body',
  'koa-rewrite',
  'koa-send',
  'koa-static',
  'mobile-detect',
  'mysql2',
  'redis',
  'sequelize',
]

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'sync-models': resolve(__dirname, 'src/sync-models.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external,
      output: {
        entryFileNames: '[name].js',
      },
    },
    sourcemap: true,
    target: 'node20',
  },
  plugins: [
    dts({
      entryRoot: 'src',
      exclude: ['tests'],
      rollupTypes: true,
    }),
  ],
})
