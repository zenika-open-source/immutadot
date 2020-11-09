module.exports = {
  extends: ['airbnb-typescript/base'],
  ignorePatterns: ['**/*.js'],
  parserOptions: {
    project: './tsconfig.json',
  },
  overrides: [
    {
      files: ['src/**/*.spec.ts'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
      env: {
        'jest/globals': true,
      },
      parserOptions: {
        project: './jest.tsconfig.json',
      },
    },
  ],
  rules: {
    '@typescript-eslint/no-use-before-define': ['error', 'nofunc'],
    '@typescript-eslint/semi': ['error', 'never'],
    'default-case': 'off',
    'max-len': ['error', { 'code': 160 }],
    'no-case-declarations': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
  },
}
