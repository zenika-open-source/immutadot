import { convertStringMethod } from './convertStringMethod'

/**
 * Replaces by former string in lower case.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {string?} locale Locale.
 * @return {Object} Returns the updated object.
 * @example toLocaleLowerCase({ nested: { a: 'ÇA vA Bien ?' } }, 'fr_fr') // => { nested: { a: 'ça va bien ?' } }
 * @see {@link https://mdn.io/String.prototype.toLocaleLowerCase|String.prototype.toLocaleLowerCase} for more information.
 * @since 1.0.0
 */
const toLocaleLowerCase = convertStringMethod('toLocaleLowerCase')

export { toLocaleLowerCase }
