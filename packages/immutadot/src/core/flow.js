import { flatten } from 'util/array'
import { isFunction } from 'util/lang'

/**
 * A function successively calling a list of functions.
 * @callback flowFunction
 * @memberof core
 * @param {*} arg The starting value
 * @returns {*} The resulting value
 * @since 1.0.0
 */

/**
 * Creates a function that will successively call all functions contained in <code>args</code>.<br/>
 * Each function is called with the result of the previous one.<br/>
 * Non functions <code>args</code> are tolerated and will be ignored.
 * @memberof core
 * @param {...(function|Array<function>)} args The functions to apply
 * @returns {core.flowFunction} A function successively calling function <code>args</code>
 * @since 1.0.0
 */
function flow(...args) {
  const fns = flatten(args)
    .filter(fn => isFunction(fn))
    .map(fn => fn.applier === undefined ? (
      ([obj, appliedPaths]) => [fn(obj), appliedPaths]
    ) : (
      ([obj, appliedPaths]) => [
        fn.applier(obj, appliedPaths),
        [...appliedPaths, fn.applier.path],
      ]
    ))
  return obj => {
    const [result] = fns.reduce(
      (acc, fn) => fn(acc),
      [obj, []],
    )
    return result
  }
}

export { flow }
