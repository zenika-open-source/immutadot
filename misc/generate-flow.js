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
    const packageDir = process.cwd()
    const rootDir = path.resolve(packageDir, '../..')
    const generatedDir = path.resolve(packageDir, 'generated')
    const flowDir = path.resolve(generatedDir, 'flow')
    await remove(generatedDir)
    await ensureDir(flowDir)

    const items = await jsdoc.explain({
      configure: path.resolve(rootDir, 'jsdoc.json'),
      files: path.resolve(packageDir, 'src'), // Workaround while this hasn't been merged : https://github.com/jsdoc2md/jsdoc-api/pull/9
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

      await (async () => {
        for (const { name } of nsItems) {
          await writeFile(
            path.resolve(nsDir, `${name}.js`),
            `import { ${name} } from '${namespace}/${name}'

const { curried } = ${name}

export { curried as ${name} }
`,
          )
        }
      })()

      await writeFile(
        path.resolve(nsDir, 'index.js'),
        `${nsItems.map(({ name }) => `export * from './${name}'`).join('\n')}
`,
      )
    }))

    const exportedNames = new Set()
    await writeFile(
      path.resolve(flowDir, 'exports.js'),
      `${namespaces.map(namespace => {
        const nsItems = itemsByNamespace[namespace].filter(({ name }) => !exportedNames.has(name))
        nsItems.forEach(({ name }) => exportedNames.add(name))
        /* eslint-disable */
        return `export {
${nsItems.map(({ name }) => `  ${name},`).join('\n')}
} from './${namespace}'`
      }).join('\n\n')}
`,
      /* eslint-enable */
    )
  } catch (e) {
    console.error(e) // eslint-disable-line no-console
    process.exit(1)
  }
}

generateFlow()
