import { pick as _pick } from 'lodash'
import { convert } from 'immutadot'

/**
 * Replaces by an object picking specified properties.
 * @function
 * @memberof object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @return {Object} Returns the updated object.
 * @example pick({ nested: { a: 1, b: 2, c: 3 } }, 'nested', 'b') // => { nested: { b: 2 } }
 * @see {@link https://lodash.com/docs#pick|lodash.pick} for more information.
 * @since 1.0.0
 */
const pick = convert(_pick)
export { pick }
