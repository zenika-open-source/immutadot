import babel from 'rollup-plugin-babel'
import fs from 'fs'
import resolve from 'rollup-plugin-node-resolve'

const basePath = pkg => `${__dirname}/packages/${pkg}`
const entryPoint = pkg => `${basePath(pkg)}/src/index.js`
const distFile = (pkg, min) => `${basePath(pkg)}/dist/${pkg}${min ? '.min' : ''}.js`

const makeBundle = (name, options = {}) => {
  const root = basePath(name)

  const pkg = JSON.parse(fs.readFileSync(`${root}/package.json`))
  const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ]

  const config = {
    input: entryPoint(name),
    name: pkg.name,
    output: {
      file: distFile(name, isProd),
      format: 'umd',
    },
    external,
    plugins: [
      resolve({ modulesOnly: true }),
      babel({
        babelrc: false,
        presets: [
          ['env', { modules: false }],
          ['stage-3'],
        ],
        plugins: [
          'external-helpers',
          ['module-resolver', { root: [`${root}/src`] }],
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

const env = process.env.NODE_ENV
const isProd = env === 'production'

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
