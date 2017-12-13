import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import eslint from 'rollup-plugin-eslint'
import nodeResolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'

const basePath = pkg => `packages/${pkg}`
const entryPoint = pkg => `${basePath(pkg)}/src/index.js`
const distFile = (pkg, min) => `dist/${pkg}${min ? '.min' : ''}.js`

const makeBundle = name => {
  const root = basePath(name)

  return {
    input: entryPoint(name),
    output: {
      file: distFile(name, isProd),
      format: 'umd',
    },
    plugins: [
      nodeResolve({ jsnext: true }),
      commonjs(),
      eslint(),
      babel({ exclude: `${root}/node_modules/**` }),
      isProd && uglify(),
    ],
  }
}

const env = process.env.NODE_ENV
const isProd = env === 'production'

const bundles = ['immutadot', 'immutadot-lodash']

export default bundles.map(makeBundle)
