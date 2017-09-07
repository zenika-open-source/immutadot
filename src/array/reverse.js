import _reverse from 'lodash/reverse'
import { convert } from 'util/convert'

/**
 * Replaces an array reversing the elements from the former array.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @return {Object} Returns the updated object.
 * @example reverse({ nested: { prop: [1, 2, 3] } }, 'nested.prop') // => { nested: { prop: [3, 2, 1] } }
 * @see {@link https://lodash.com/docs#reverse|lodash.reverse} for more information.
 * @since 0.3.0
 */
const reverse = convert(_reverse)
export { reverse, reverse as default }
