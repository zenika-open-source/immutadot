import _takeRight from 'lodash/fp/takeRight'
import { convertLodashFp } from '../util/convert'

/**
 * Creates a slice of array with <code>n</code> elements takeRight from the end.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} n Number of elements to takeRight from the end of the array.
 * @return {Object} Returns the updated object.
 * @example takeRight({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', 2) // => { nested: { prop: [3, 4] } }
 * @see {@link https://lodash.com/docs#takeRight|lodash.takeRight} for more information.
 * @since 0.3.0
 */
const takeRight = convertLodashFp(_takeRight)
export default takeRight
