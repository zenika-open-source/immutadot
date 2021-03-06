import { dropWhile as _dropWhile } from 'lodash'
import { apply } from 'immutadot/core'

/**
 * Replaces an array excluding elements dropped from the beginning. Elements are dropped until <code>predicate</code> returns falsey.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {Function} [predicate={@link https://lodash.com/docs#identity|lodash.identity}] The function invoked per iteration.
 * @return {Object} Returns the updated object.
 * @example dropWhile({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', v => v < 3) // => { nested: { prop: [3, 4] } }
 * @see {@link https://lodash.com/docs#dropWhile|lodash.dropWhile} for more information.
 * @since 1.0.0
 */
const dropWhile = apply(_dropWhile, { arity: 1 })

export { dropWhile }
