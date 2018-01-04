import { convertStringMethod } from './convertStringMethod'

/**
 * Replaces by former string in upper case.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {string?} locale Locale.
 * @return {Object} Returns the updated object.
 * @example toLocaleUpperCase({ nested: { a: 'çA vA Bien ?' } }, 'fr_fr') // => { nested: { a: 'ÇA VA BIEN ?' } }
 * @see {@link https://mdn.io/String.prototype.toLocaleUpperCase|String.prototype.toLocaleUpperCase} for more information.
 * @since 1.0.0
 */
const toLocaleUpperCase = convertStringMethod('toLocaleUpperCase')

export { toLocaleUpperCase }
