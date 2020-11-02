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
    '@typescript-eslint/semi': ['error', 'never'],
  },
}
