/** @type {import('@types/eslint').Linter.Config} */
module.exports = {
  env: {},
  extends: ['ts-prefixer', 'plugin:jsx-a11y/recommended'],
  globals: {},
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['frontend/tsconfig.json'],
  },
  plugins: ['react-hooks', 'jsx-a11y'],
  root: true,
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'linebreak-style': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  settings: {},
}
