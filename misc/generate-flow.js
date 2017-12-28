const fs = require('fs-extra')
const path = require('path')
const util = require('util')
const _ = require('lodash')
const jsdoc = require('jsdoc-api')
const cla = require('command-line-args')

const { external } = cla([
  {
    name: 'external',
    type: Boolean,
  },
])

const ensureDir = util.promisify(fs.ensureDir)
const remove = util.promisify(fs.remove)
const writeFile = util.promisify(fs.writeFile)

const generateFlow = async () => {
  try {
    const packageDir = process.cwd()
    const rootDir = path.resolve(packageDir, '../..')
    const generatedDir = path.resolve(packageDir, 'generated')
    const flowDir = path.resolve(generatedDir, 'flow')
    const seqDir = path.resolve(generatedDir, 'seq')
    await remove(generatedDir)
    await ensureDir(flowDir)
    await ensureDir(seqDir)

    const items = await jsdoc.explain({
      configure: path.resolve(rootDir, 'config/jsdoc.json'),
      files: path.resolve(packageDir, 'src'), // Workaround while this hasn't been merged : https://github.com/jsdoc2md/jsdoc-api/pull/9
    })

    const itemsByNamespace = _.chain(items)
      .filter('flow')
      .groupBy('memberof')
      .value()

    const namespaces = _.keys(itemsByNamespace)

    const conflicts = _.chain(items)
      .filter('flow')
      .reduce((acc, { name }) => ({
        ...acc,
        [name]: acc[name] !== undefined,
      }), {})
      .pickBy()
      .keys()
      .value()

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

    await writeFile(
      path.resolve(flowDir, 'exports.js'),
      `${namespaces.map(namespace => {
        const nsItems = itemsByNamespace[namespace]
        /* eslint-disable comma-spacing,indent */
        return `export {
${nsItems.map(({ name }) => `  ${name}${conflicts.includes(name) ? ` as ${namespace}${_.capitalize(name)}` : ''},`).join('\n')}
} from './${namespace}'`
      }).join('\n\n')}
`, /* eslint-enable */
    )

    await Promise.all(namespaces.map(async namespace => {
      const nsDir = path.resolve(seqDir, namespace)
      await ensureDir(nsDir)

      const nsItems = itemsByNamespace[namespace]

      await (async () => {
        for (const { name } of nsItems) {
          await writeFile(
            path.resolve(nsDir, `${name}.js`),
            /* eslint-disable indent */
`import { ChainWrapper } from '${external ? 'immutadot/' : ''}seq/ChainWrapper'

import { ${name} } from '${namespace}/${name}'

ChainWrapper.prototype.${name} = function(path, ...args) {
  return this._call(${name}, path, args)
}
`, /* eslint-enable */
          )

          if (conflicts.includes(name)) {
            await writeFile(
              path.resolve(nsDir, `${name}.ns.js`),
              /* eslint-disable indent */
`import { ChainWrapper } from '${external ? 'immutadot/' : ''}seq/ChainWrapper'

import { ${name} } from '${namespace}/${name}'

ChainWrapper.prototype.${namespace}${_.capitalize(name)} = function(path, ...args) {
  return this._call(${name}, path, args)
}
`, /* eslint-enable */
            )
          }
        }
      })()

      await writeFile(
        path.resolve(nsDir, 'index.js'),
        /* eslint-disable indent */
`${nsItems.map(({ name }) => `import './${name}'`).join('\n')}
`, /* eslint-enable */
      )

      await writeFile(
        path.resolve(nsDir, 'ns.js'),
        /* eslint-disable indent */
`${nsItems.map(({ name }) => `import './${name}${conflicts.includes(name) ? '.ns' : ''}'`).join('\n')}
`, /* eslint-enable */
      )
    }))

    await writeFile(
      path.resolve(seqDir, 'all.js'),
      /* eslint-disable indent */
      `${namespaces.map(namespace => `import './${namespace}/ns'`).join('\n')}
`, /* eslint-enable */
    )
  } catch (e) {
    console.error(e) // eslint-disable-line no-console
    process.exit(1)
  }
}

generateFlow()
