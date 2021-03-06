import { dropRightWhile as _dropRightWhile } from 'lodash'
import { apply } from 'immutadot/core'

/**
 * Replaces an array excluding elements dropped from the end. Elements are dropped until <code>predicate</code> returns falsey.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {Function} [predicate={@link https://lodash.com/docs#identity|lodash.identity}] The function invoked per iteration.
 * @return {Object} Returns the updated object.
 * @example dropRightWhile({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', v => v > 2) // => { nested: { prop: [1, 2] } }
 * @see {@link https://lodash.com/docs#dropRightWhile|lodash.dropRightWhile} for more information.
 * @since 1.0.0
 */
const dropRightWhile = apply(_dropRightWhile, { arity: 1 })

export { dropRightWhile }
