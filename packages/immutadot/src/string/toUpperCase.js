import { convertStringMethod } from './convertStringMethod'

/**
 * Replaces by former string in upper case.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @return {Object} Returns the updated object.
 * @example toUpperCase({ nested: { a: 'Hello world !' } }, 'fr_fr') // => { nested: { a: 'HELLO WORLD !' } }
 * @see {@link https://mdn.io/String.prototype.toUpperCase|String.prototype.toUpperCase} for more information.
 * @since 1.0.0
 * @flow
 */
const toUpperCase = convertStringMethod('toUpperCase')

export { toUpperCase }
