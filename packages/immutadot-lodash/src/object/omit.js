import { omit as _omit } from 'lodash'
import { convert } from 'immutadot'

/**
 * Replaces by an object omitting specified properties.
 * @function
 * @memberof object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...(string|string[])} [paths] The property paths to omit.
 * @return {Object} Returns the updated object.
 * @example omit({ nested: { a: 1, b: 2, c: 3 } }, 'nested', 'b') // => { nested: { a:1, c: 3 } }
 * @see {@link https://lodash.com/docs#omit|lodash.omit} for more information.
 * @since 1.0.0
 */
const omit = convert(_omit)
export { omit }
