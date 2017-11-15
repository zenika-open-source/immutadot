import _toUpper from 'lodash/toUpper'
import { convert } from 'core/convert'

/**
 * Converts string, as a whole, to upper case just like String#toUpperCase.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @return {Object} Returns the updated object.
 * @example toUpper({ nested: { a: "a string" } }, 'nested.a') // => { nested: { a: "A STRING" } }
 * @see {@link https://lodash.com/docs#toUpper|lodash.toUpper} for more information.
 * @see {@link https://mdn.io/String/toUpperCase|String.toUpperCase} for more information.
 * @since 0.3.0
 * @flow
 */
const toUpper = convert(_toUpper)
export { toUpper }
