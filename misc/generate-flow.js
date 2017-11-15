const fs = require('fs-extra')
const path = require('path')
const util = require('util')
const _ = require('lodash')
const jsdoc = require('jsdoc-api')

const ensureDir = util.promisify(fs.ensureDir)
const remove = util.promisify(fs.remove)
const writeFile = util.promisify(fs.writeFile)

const generateFlow = async () => {
  try {
    const rootDir = path.resolve(__dirname, '..')
    const generatedDir = path.resolve(rootDir, 'generated')
    const flowDir = path.resolve(generatedDir, 'flow')
    await remove(generatedDir)
    await ensureDir(flowDir)

    const items = await jsdoc.explain({
      configure: path.resolve(rootDir, 'jsdoc.json'),
      files: path.resolve(rootDir, 'src'), // Workaround while this hasn't been merged : https://github.com/jsdoc2md/jsdoc-api/pull/9
    })

    const itemsByNamespace = _.chain(items)
      .filter('flow')
      .groupBy('memberof')
      .value()

    const namespaces = _.keys(itemsByNamespace)
    await Promise.all(namespaces.map(async namespace => {
      const nsDir = path.resolve(flowDir, namespace)
      await ensureDir(nsDir)

      const nsItems = itemsByNamespace[namespace]

      nsItems.forEach(async ({ name }) => await writeFile(
        path.resolve(nsDir, `${name}.js`),
        `import { ${name} } from '${namespace}/${name}'

const { curried } = ${name}

export { curried as ${name} }
`,
      ))

      await writeFile(
        path.resolve(nsDir, 'index.js'),
        `${nsItems.map(({ name }) => `import { ${name} } from './${name}'`).join('\n')}

export {
${nsItems.map(({ name }) => `  ${name},`).join('\n')}
}
`,
      )
    }))

    await writeFile(
      path.resolve(flowDir, 'exports.js'),
      `${namespaces.map(namespace => `export * from './${namespace}'`).join('\n')}
`,
    )
  } catch (e) {
    console.error(e) // eslint-disable-line no-console
    process.exit(1)
  }
}

generateFlow()
