import { union as _union } from 'lodash'
import { apply } from 'immutadot/core'

/**
 * Replaces an array by an array of unique values, in order, from the former array and the given arrays.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Array} [arrays] The arrays to inspect.
 * @return {Object} Returns the updated object.
 * @example union({ nested: { prop: [1, 2] } }, 'nested.prop', [2, 3]) // => { nested: { prop: [1, 2, 3] } }
 * @see {@link https://lodash.com/docs#union|lodash.union} for more information.
 * @since 1.0.0
 */
const union = apply(_union, { arity: 2 })

export { union }
