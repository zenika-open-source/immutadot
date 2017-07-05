import lodashFpConvert from './lodashFpConvert'
import update from '../object/update'

/**
 * Wraps an <code>updater</code> function, returning a new function taking <code>object</code>, <code>path</code> and <code>…args</code> as parameters.<br/>
 * The <code>updater</code> function is invoked with <code>value</code> and <code>…args</code>.<br/>
 * Be carefull, the <code>updater</code> function must not mutate its <code>value</code> argument.
 * @function
 * @memberof util
 * @param {function} updater The updater function.
 * @return {function} Returns the wrapped function.
 * @example <caption>Wrapping an updater</caption>
 * const inc = (v, i = 1) => v + i // this function increments a number with an optional value which defaults to 1
 * const incProp = convert(inc)
 * const object = { nested: { prop: 4 } }
 * incProp(object, 'nested.prop') // => { nested: { prop: 5 } }
 * incProp(object, 'nested.prop', 2) // => { nested: { prop: 6 } }
 * @see {@link object.update|update} for more information.
 * @since 0.1.14
 */
const convert = updater => (obj, path, ...rest) => update(obj, path, updater, ...rest)
export default convert

/**
 * Converts and wraps a lodash/fp function.
 * @function
 * @memberof util
 * @param {function} fn The lodash/fp function.
 * @return {function} Returns the wrapped function.
 * @see {@link util.convert|convert} for more information.
 * @since 0.1.14
 * @private
 */
export const convertLodashFp = fn => convert(lodashFpConvert(fn))