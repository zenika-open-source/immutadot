import babelPlugin from 'rollup-plugin-babel'
import fs from 'fs'
import { resolve } from 'path'
import resolvePlugin from 'rollup-plugin-node-resolve'

const root = resolve(__dirname, '..')

// FIXME put back uglify and .min

const makeBundle = (name, options = {}) => {
  const pkgRoot = resolve(root, 'packages', name)

  const pkg = JSON.parse(fs.readFileSync(resolve(pkgRoot, 'package.json')))

  const srcDir = resolve(pkgRoot, 'src')
  const entryPoint = resolve(srcDir, 'index.js')
  const distFile = resolve(pkgRoot, 'dist', `${pkg.name}.js`)

  const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ]

  const config = {
    input: entryPoint,
    name: pkg.name,
    output: {
      file: distFile,
      format: 'umd',
    },
    external,
    plugins: [
      resolvePlugin({ modulesOnly: true }),
      babelPlugin({
        babelrc: false,
        presets: [
          ['env', { modules: false }],
          ['stage-3'],
        ],
        plugins: [
          'external-helpers',
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
  [
    'immutadot-lodash',
    {
      external: ['lodash/fp'],
      globals: {
        'lodash': 'lodash',
        'lodash/fp': 'fp',
        'immutadot': 'immutadot',
      },
    },
  ],
]

export default bundles.map(args => makeBundle(...args))
