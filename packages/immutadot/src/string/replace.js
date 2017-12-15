import { convertStringMethod } from './convertStringMethod'

/**
 * Replaces matches for pattern in string with replacement.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {RegExp|string} pattern The pattern to replace.
 * @param {Function|string} replacement The match replacement.
 * @return {Object} Returns the updated object.
 * @example replace({ nested: { a: 'Hi Nico' } }, 'nested.a', 'Nico', 'Yvo') // => { nested: { a: 'Hi Yvo' } }
 * @see {@link https://mdn.io/String.prototype.replace|String.prototype.replace} for more information.
 * @since 0.3.0
 * @flow
 */
const replace = convertStringMethod('replace')

export { replace }
