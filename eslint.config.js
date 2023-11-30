// eslint.config.js
import antfu from '@antfu/eslint-config'

export default await antfu({
  overrides: {},
  // Enable stylistic formatting rules
  // stylistic: true,

  // Or customize the stylistic rules
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },

  // TypeScript and Vue are auto-detected, you can also explicitly enable them:
  typescript: true,
  react: true,
  // Disable jsonc and yaml support
  jsonc: false,
  yaml: false,

  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  ignores: [
    './fixtures',
    'node_modules/',
    'dist/',
    '.prettierrc.js',
    'env.d.ts',
    // ...globs
  ],
})
