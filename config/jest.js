const { resolve } = require('path')

const rootDir = process.cwd()

const coverageDirectory = resolve(rootDir, 'coverage')
const coveragePathIgnorePatterns = ['<rootDir>/misc/', '/node_modules/']
const roots = [rootDir]
const setupTestFrameworkScriptFile = resolve(__dirname, 'test.setup.js')

module.exports = {
  coverageDirectory,
  coveragePathIgnorePatterns,
  coverageReporters: ['lcov'],
  roots,
  setupTestFrameworkScriptFile,
}
