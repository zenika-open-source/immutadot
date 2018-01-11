import _take from 'lodash/take'
import { convert } from 'immutadot'

/**
 * Creates a slice of array with <code>n</code> elements taken from the beginning.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} [n=1] Number of elements to take from the beginning of the array.
 * @return {Object} Returns the updated object.
 * @example take({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', 2) // => { nested: { prop: [1, 2] } }
 * @see {@link https://lodash.com/docs#take|lodash.take} for more information.
 * @since 1.0.0
 */
const take = convert(_take)
export { take }
