const { resolve } = require('path')

const setupTestFrameworkScriptFile = resolve(__dirname, 'misc/test.setup.js')
const roots = [process.cwd()]

module.exports = {
  coverageReporters: ['json'],
  roots,
  setupTestFrameworkScriptFile,
}
