import _divide from 'lodash/divide'
import { convert } from 'util/convert'

/**
 * Replaces by the division of the former number and the given number.
 * @function
 * @memberof math
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} divisor The second number in the division.
 * @return {Object} Returns the updated object.
 * @example divide({ nested: { prop: 1332 } }, 'nested.prop', 2) // => { nested: { prop: 666 } }
 * @see {@link https://lodash.com/docs#divide|lodash.divide} for more information.
 * @since 0.3.0
 */
const divide = convert(_divide)
export { divide }
