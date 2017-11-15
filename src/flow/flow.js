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
 * @function
 * @memberof flow
 * @param {...function} fns The functions to apply
 * @returns {flow.flowFunction} A function successively calling <code>fns</code>
 * @since 1.0.0
 */
const flow = (...fns) => pObj => fns.reduce((obj, fn) => fn(obj), pObj)

export { flow }
