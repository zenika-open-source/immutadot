import { takeRightWhile as _takeRightWhile } from 'lodash'
import { apply } from 'immutadot/core'

/**
 * Creates a slice of array with elements taken from the end.
 * Elements are taken until predicate returns falsey.
 * The predicate is invoked with three arguments: (value, index, array).
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {Function} [predicate={@link https://lodash.com/docs#identity|lodash.identity}] The function invoked per iteration.
 * @return {Object} Returns the updated object.
 * @example takeRightWhile({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', v => v > 3) // => { nested: { prop: [4] } }
 * @see {@link https://lodash.com/docs#takeRightWhile|lodash.takeRightWhile} for more information.
 * @since 1.0.0
 */
const takeRightWhile = apply(_takeRightWhile, { arity: 1 })

export { takeRightWhile }
