const { resolve } = require('path')

const coverageDirectory = resolve(process.cwd(), 'coverage')
const coveragePathIgnorePatterns = ['<rootDir>/misc/', '/node_modules/']
const roots = [process.cwd()]
const setupTestFrameworkScriptFile = resolve(__dirname, 'misc/test.setup.js')

module.exports = {
  coverageDirectory,
  coveragePathIgnorePatterns,
  coverageReporters: ['lcov'],
  roots,
  setupTestFrameworkScriptFile,
}
