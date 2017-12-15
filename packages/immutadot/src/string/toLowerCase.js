import { convertStringMethod } from './convertStringMethod'

/**
 * Replaces by former string in lower case.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @return {Object} Returns the updated object.
 * @example toLowerCase({ nested: { a: 'Hello WORLD !' } }, 'fr_fr') // => { nested: { a: 'hello world !' } }
 * @see {@link https://mdn.io/String.prototype.toLowerCase|String.prototype.toLowerCase} for more information.
 * @since 1.0.0
 * @flow
 */
const toLowerCase = convertStringMethod('toLowerCase')

export { toLowerCase }
