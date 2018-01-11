import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

const basePath = pkg => `${__dirname}/packages/${pkg}`
const entryPoint = pkg => `${basePath(pkg)}/src/index.js`
const distFile = (pkg, min) => `${basePath(pkg)}/dist/${pkg}${min ? '.min' : ''}.js`

const makeBundle = (name, options = {}) => {
  const root = basePath(name)

  return {
    input: entryPoint(name),
    name,
    output: {
      file: distFile(name, isProd),
      format: 'umd',
    },
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
    ...options,
  }
}

const env = process.env.NODE_ENV
const isProd = env === 'production'

const bundles = [
  ['immutadot'],
  [
    'immutadot-lodash',
    {
      external: ['immutadot', 'lodash'],
      globals: ['immutadot', 'lodash'],
    },
  ],
]

export default bundles.map(args => makeBundle(...args))
