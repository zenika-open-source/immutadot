import _union from 'lodash/union'
import { convert } from 'immutadot'

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
const union = convert(_union)
export { union }
