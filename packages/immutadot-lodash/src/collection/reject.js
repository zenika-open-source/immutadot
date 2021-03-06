import { reject as _reject } from 'lodash'
import { apply } from 'immutadot/core'

/**
 * Replaces by an array of elements <code>predicate</code> returns falsy for.
 * @function
 * @memberof collection
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {function} [predicate={@link https://lodash.com/docs#identity|lodash.identity}] The function invoked per iteration.
 * @return {Object} Returns the updated object.
 * @see {@link https://lodash.com/docs#reject|lodash.reject} for more information.
 * @example reject({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', v => v % 2) // => { nested: { prop: [2, 4] } }
 * @since 1.0.0
 */
const reject = apply(_reject, { arity: 1 })

export { reject }
