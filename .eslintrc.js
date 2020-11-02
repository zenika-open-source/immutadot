module.exports = {
  extends: ['airbnb-typescript/base'],
  ignorePatterns: ['**/*.js'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/semi': ['error', 'never'],
  },
}
