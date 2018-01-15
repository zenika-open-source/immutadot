import babelPlugin from 'rollup-plugin-babel'
import { camelCase } from 'lodash'
import commonjsPlugin from 'rollup-plugin-commonjs'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import resolvePlugin from 'rollup-plugin-node-resolve'

const root = resolve(__dirname, '..')
const nodeModules = resolve(root, 'node_modules')
const distDir = resolve(root, 'dist')

const makeBundle = (name, options = {}) => {
  const pkgRoot = resolve(root, 'packages', name)

  const pkg = JSON.parse(readFileSync(resolve(pkgRoot, 'package.json')))

  const srcDir = resolve(pkgRoot, 'src')
  const entryPoint = resolve(srcDir, 'index.js')
  const distFile = resolve(distDir, `${pkg.name}.js`)

  const external = Object.keys(pkg.peerDependencies || {})

  const config = {
    input: entryPoint,
    name: camelCase(pkg.name),
    output: {
      file: distFile,
      format: 'umd',
    },
    external,
    plugins: [
      resolvePlugin(), // Resolves project dependencies
      commonjsPlugin({ include: `${nodeModules}/**` }), // Includes non external dependencies in the bundle
      babelPlugin({
        babelrc: false,
        runtimeHelpers: true, // Allows transform-runtime plugin
        exclude: `${nodeModules}/**`, // node_modules dependencies are handled by commonjsPlugin
        presets: [
          ['env', { modules: false }], // Module format is configured at rollup level
          ['stage-3'],
        ],
        plugins: [
          'transform-runtime',
          ['module-resolver', { root: [srcDir] }],
        ],
      }),
    ],
  }

  return Object.keys(options).reduce((newConf, key) => {
    let value = options[key]

    if (Array.isArray(newConf[key])) {
      value = [
        ...newConf[key],
        ...options[key],
      ]
    } else if (typeof newConf[key] === 'object') {
      value = {
        ...newConf[key],
        ...options[key],
      }
    }

    return {
      ...newConf,
      [key]: value,
    }
  }, config)
}

const bundles = [
  ['immutadot'],
  ['immutadot-lodash', {
    external: ['lodash/fp'],
    globals: {
      'lodash': '_',
      'lodash/fp': '_.fp',
      'immutadot': 'immutadot',
    },
  }],
]

export default bundles.map(args => makeBundle(...args))
