import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

const basePath = pkg => `packages/${pkg}`
const entryPoint = pkg => `${basePath(pkg)}/src/index.js`
const distFile = (pkg, min) => `${basePath(pkg)}/dist/${pkg}${min ? '.min' : ''}.js`

const makeBundle = name => {
  const root = basePath(name)

  return {
    input: entryPoint(name),
    name,
    output: {
      file: distFile(name, isProd),
      format: 'umd',
    },
    plugins: [
      resolve(),
      babel({
        babelrc: false,
        exclude: `${root}/node_modules/**`,
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
}

const env = process.env.NODE_ENV
const isProd = env === 'production'

const bundles = ['immutadot']

export default bundles.map(makeBundle)
