import { flatten } from 'util/array'
import { isNil } from 'util/lang'

/**
 * A function successively applying a list of functions.
 * @callback flowFunction
 * @memberof flow
 * @param {*} arg The starting value
 * @returns {*} The resulting value
 * @since 1.0.0
 */

/**
 * Successively calls <code>fns</code>.<br/>
 * Each function is called with the result of the previous one.<br/>
 * Falsey functions (<code>null</code>, <code>undefined</code> and <code>false</code>) are tolerated and will be skipped.
 * @memberof core
 * @param {...(function|Array<function>)} args The functions to apply
 * @returns {flow.flowFunction} A function successively calling <code>fns</code>
 * @since 1.0.0
 */
function flow(...args) {
  const fns = flatten(args)
    .filter(fn => !isNil(fn) && fn !== false)
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
