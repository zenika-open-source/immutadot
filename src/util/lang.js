const isSymbol = arg => typeof arg === 'symbol'

const toString = arg => typeof arg === 'string' ? arg : `${arg}`

export {
  isSymbol,
  toString,
}
