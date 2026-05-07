// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    'dist',
    'docs/.vitepress/cache',
    'docs/.vitepress/dist',
    'example',
    'lib',
  ],
}, {
  files: ['src/**/*.ts', 'tests/**/*.ts'],
  rules: {
    'ts/explicit-function-return-type': 'off',
  },
})
