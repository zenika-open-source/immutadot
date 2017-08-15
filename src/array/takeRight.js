import _takeRight from 'lodash/takeRight'
import { convert } from '../util/convert'

/**
 * Creates a slice of array with <code>n</code> elements taken from the end.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} [n=1] Number of elements to take from the end of the array.
 * @return {Object} Returns the updated object.
 * @example takeRight({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', 2) // => { nested: { prop: [3, 4] } }
 * @see {@link https://lodash.com/docs#takeRight|lodash.takeRight} for more information.
 * @since 0.3.0
 */
const takeRight = convert(_takeRight)
export { takeRight, takeRight as default }
