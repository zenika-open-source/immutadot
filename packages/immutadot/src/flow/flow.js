import { flatten } from 'util/array'

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
 * Each function is called with the result of the previous one.
 * @memberof flow
 * @param {...(function|Array<function>)} args The functions to apply
 * @returns {flow.flowFunction} A function successively calling <code>fns</code>
 * @since 1.0.0
 */
function flow(...args) {
  const fns = flatten(args)
  return pObj => {
    const [result] = fns.reduce(
      ([obj, appliedPaths], fn) => [
        fn(obj, appliedPaths),
        [...appliedPaths, fn.path],
      ],
      [pObj, []],
    )
    return result
  }
}

export { flow }
