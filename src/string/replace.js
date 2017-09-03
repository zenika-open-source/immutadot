import _replace from 'lodash/replace'
import { convert } from 'util/convert'

/**
 * Replaces matches for pattern in string with replacement.
 * @function
 * @memberof object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {RegExp|string} pattern The pattern to replace.
 * @param {Function|string} replacement The match replacement.
 * @return {Object} Returns the updated object.
 * @example replace({ nested: { a: "Hi Nico" } }, 'nested.a', 'Nico', 'Yvo') // => { nested: { a: "Hi Yvo" } }
 * @see {@link https://lodash.com/docs#replace|lodash.replace} for more information.
 * @see {@link https://lodash.com/docs#identity|lodash.identity} for more information.
 * @since 0.3.0
 */
const replace = convert(_replace)
export { replace, replace as default }
