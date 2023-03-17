module.exports = {
  extends: ['airbnb-typescript/base'],
  ignorePatterns: ['**/*.js'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/no-use-before-define': ['error', 'nofunc'],
    '@typescript-eslint/semi': ['error', 'never'],
    'default-case': 'off',
    'import/prefer-default-export': 'off',
    'max-len': ['error', { code: 160 }],
    'no-case-declarations': 'off',
    'no-fallthrough': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'object-curly-newline': ['error', { consistent: true }]
  },
}
