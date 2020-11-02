import { apply } from 'immutadot/core'
import { lodashFpConvert } from './lodashFpConvert'

/**
 * Converts and wraps a lodash/fp function.
 * @memberof util
 * @param {function} fn The lodash/fp function.
 * @return {function} Returns the wrapped function.
 * @see {@link util.convert|convert} for more information.
 * @since 0.2.0
 * @private
 */
function applyLodashFp(fn, { arity = fn.length, fixedArity = false } = {}) {
  return apply(
    lodashFpConvert(fn),
    {
      arity,
      fixedArity,
    },
  )
}

export { applyLodashFp }
