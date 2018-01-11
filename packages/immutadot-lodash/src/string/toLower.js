import { toLower as _toLower } from 'lodash'
import { convert } from 'immutadot'

/**
 * Converts string, as a whole, to lower case just like String#toLowerCase.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @return {Object} Returns the updated object.
 * @example toLower({ nested: { a: "A STRING" } }, 'nested.a') // => { nested: { a: "a string" } }
 * @see {@link https://lodash.com/docs#toLower|lodash.toLower} for more information.
 * @see {@link https://mdn.io/String/toLowerCase|String.toLowerCase} for more information.
 * @since 1.0.0
 */
const toLower = convert(_toLower)
export { toLower }
