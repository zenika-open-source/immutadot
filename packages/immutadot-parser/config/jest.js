const rootDir = process.cwd()

module.exports = {
  globals: { 'ts-jest': { tsConfig: 'config/tsconfig.json' } },
  preset: 'ts-jest',
  rootDir,
  testEnvironment: 'node',
}
