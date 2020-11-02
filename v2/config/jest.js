const { resolve } = require('path')

const rootDir = process.cwd()

const coverageDirectory = resolve(rootDir, 'coverage')
const setupTestFrameworkScriptFile = resolve(__dirname, 'test.setup.js')

module.exports = {
  coverageDirectory,
  coverageReporters: ['lcov'],
  rootDir,
  setupTestFrameworkScriptFile,
}
