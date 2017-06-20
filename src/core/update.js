import fpUpdate from 'lodash/fp/update'
import isFunction from 'lodash/isFunction'
import { lodashFpConvertOptions } from '../consts'

const rawUpdate = fpUpdate.convert(lodashFpConvertOptions)

/**
 * Internal version of <code>update</code> without support of <code>updater</code> only.
 * @memberof core
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {function} updater The function to produce the updated value.
 * @param {...*} args The remaining args.
 * @return {Object} Returns the updated object.
 * @since 0.1.5
 * @private
 */
export const updatePassingArgs = (object, path, updater, ...args) => rawUpdate(object, path, v => updater(v, ...args))

/**
 * Updates the value at <code>path</code> of <code>object</code> using the <code>updater</code> function.<br/>
 * The updater is invoked with <code>value</code> and <code>…args</code>.<br/>
 * <code>update</code> can be called with <code>updater</code> only, returning a function taking only <code>object</code>, <code>path</code> and <code>…args</code>.
 * @function update
 * @memberof core
 * @param {Object} [object] The object to modify.
 * @param {Array|string} [path] The path of the property to set.
 * @param {function} updater The function to produce the updated value.
 * @param {...*} args The remaining args.
 * @return {Object|function} Returns the updated object or the wrapped function.
 * @example <caption>Updating a prop</caption>
 * const inc = (v, i = 1) => v + i // this function increments a number with an optional value which defaults to 1
 * const object = { nested: { prop: 4 } }
 * update(object, 'nested.prop', inc) // => { nested: { prop: 5 } }
 * update(object, 'nested.prop', inc, 2) // => { nested: { prop: 6 } }
 * @example <caption>Wrapping an updater</caption>
 * const inc = (v, i = 1) => v + i // this function increments a number with an optional value which defaults to 1
 * const incProp = update(inc)
 * const object = { nested: { prop: 4 } }
 * incProp(object, 'nested.prop') // => { nested: { prop: 5 } }
 * incProp(object, 'nested.prop', 2) // => { nested: { prop: 6 } }
 * @see {@link https://lodash.com/docs#update|lodash.update} for more information.
 * @since 0.1.5
 */
export default (...args) => {
  if (args.length === 1 && isFunction(args[0]))
    return (obj, path, ...rest) => updatePassingArgs(obj, path, args[0], ...rest)
  return updatePassingArgs(...args)
}
