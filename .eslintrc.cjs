module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/jsx-runtime'
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        paths: ['src', 'src/css', 'src/store'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      typescript: {},
      alias: {
        map: [
          ['@', './src'],
          ['@css', './src/css'],
          ['@store', './src/store']
        ]
      }
    }
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    quotes: [1, 'single'],
    semi: [1, 'always'],
    'no-extra-semi': 1,
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error'
  }
};
