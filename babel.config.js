module.exports = function() {
  const presets = [
    ['@babel/preset-env', { modules: 'umd' }],
  ]

  const plugins = ['@babel/plugin-transform-runtime']

  const env = {
    production: {
      ignore: '.spec.js',
      plugins: [
        ['module-resolver', { root: ['./src'] }],
      ],
    },
    test: {
      plugins: [
        ['module-resolver', { root: ['./src', '../../misc'] }],
      ],
    },
  }

  return {
    presets,
    plugins,
    env,
  }
}
