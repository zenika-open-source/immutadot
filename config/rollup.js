import babelPlugin from 'rollup-plugin-babel'
import commonjsPlugin from 'rollup-plugin-commonjs'
import fs from 'fs'
import { resolve } from 'path'
import resolvePlugin from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'

const root = resolve(__dirname, '..')
const nodeModules = resolve(root, 'node_modules')

const makeBundle = (name, options = {}, minify = false) => {
  const pkgRoot = resolve(root, 'packages', name)

  const pkg = JSON.parse(fs.readFileSync(resolve(pkgRoot, 'package.json')))

  const srcDir = resolve(pkgRoot, 'src')
  const entryPoint = resolve(srcDir, 'index.js')
  const suffix = minify ? '.min' : ''
  const distFile = resolve(pkgRoot, 'dist', `${pkg.name}${suffix}.js`)

  const external = Object.keys(pkg.peerDependencies || {})

  const config = {
    input: entryPoint,
    name: pkg.name,
    output: {
      file: distFile,
      format: 'umd',
    },
    external,
    plugins: [
      resolvePlugin({ customResolveOptions: { moduleDirectory: nodeModules } }),
      commonjsPlugin({ include: `${nodeModules}/**` }),
      babelPlugin({
        babelrc: false,
        runtimeHelpers: true,
        exclude: `${nodeModules}/**`,
        presets: [
          ['env', { modules: false }],
          ['stage-3'],
        ],
        plugins: [
          'transform-runtime',
          ['module-resolver', { root: [srcDir] }],
        ],
      }),
      minify && uglify(),
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

const bundleOptions = {
  name: 'immutadot_',
  external: ['lodash/fp'],
  globals: {
    'lodash': '_',
    'lodash/fp': '_.fp',
    'immutadot': 'immutadot',
  },
}

const bundles = [
  ['immutadot'],
  ['immutadot', undefined, true],
  ['immutadot-lodash', bundleOptions],
  ['immutadot-lodash', bundleOptions, true],
]

export default bundles.map(args => makeBundle(...args))
