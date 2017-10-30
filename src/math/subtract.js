import _subtract from 'lodash/subtract'
import { convert } from 'core'

/**
 * Replaces by the subtraction of the former number by the given number.
 * @function
 * @memberof math
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} subtrahend The number to subtract.
 * @return {Object} Returns the updated object.
 * @example subtract({ nested: { prop: 2000 } }, 'nested.prop', 336) // => { nested: { prop: 1664 } }
 * @see {@link https://lodash.com/docs#subtract|lodash.subtract} for more information.
 * @since 0.3.0
 */
const subtract = convert(_subtract)
export { subtract }
