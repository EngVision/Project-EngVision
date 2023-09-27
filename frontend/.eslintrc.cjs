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
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'linebreak-style': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'sort-keys-fix/sort-keys-fix': 0,
  },
  settings: {},
}
