const rootDir = process.cwd()

module.exports = {
  globals: { 'ts-jest': { tsConfig: 'tsconfig.json' } },
  preset: 'ts-jest',
  rootDir,
  testEnvironment: 'node',
}
