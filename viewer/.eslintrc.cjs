module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'plugin:prettier/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'backend'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', '@typescript-eslint/eslint-plugin'],
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'consistent-return': 'off',
          'padding-line-between-statements': [
              'error',
              { blankLine: 'always', prev: '*', next: 'return' }
          ],
    },
  }
  