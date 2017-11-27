const { resolve } = require('path')

const coverageDirectory = resolve(process.cwd(), 'coverage')
const roots = [process.cwd()]
const setupTestFrameworkScriptFile = resolve(__dirname, 'misc/test.setup.js')

module.exports = {
  coverageDirectory,
  coverageReporters: ['lcov'],
  roots,
  setupTestFrameworkScriptFile,
}
