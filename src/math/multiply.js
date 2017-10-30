import _multiply from 'lodash/multiply'
import { convert } from 'core/convert'

/**
 * Replaces by the multiplication of the former number and the given number.
 * @function
 * @memberof math
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} multiplicand The second number in the multiplication.
 * @return {Object} Returns the updated object.
 * @example multiply({ nested: { prop: 333 } }, 'nested.prop', 2) // => { nested: { prop: 666 } }
 * @see {@link https://lodash.com/docs#multiply|lodash.multiply} for more information.
 * @since 0.3.0
 */
const multiply = convert(_multiply)
export { multiply }
