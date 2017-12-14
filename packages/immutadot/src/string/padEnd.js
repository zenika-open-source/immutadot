import { convertStringMethod } from './convertStringMethod'

/**
 * Replaces by former string padded with <code>padString</code> to the given <code>length</code>.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} targetLength The length to pad to.
 * @param {string} [padString=' '] String to add.
 * @return {Object} Returns the updated object.
 * @example padEnd({ nested: { a: "Hellow" } }, 10) // => { nested: { a: "Hellow    " } }
 * @example padEnd({ nested: { a: "Hellow" } }, 10, '?!') // => { nested: { a: "Hellow?!?!" } }
 * @see {@link https://mdn.io/String.prototype.padEnd|String.prototype.padEnd} for more information.
 * @since 1.0.0
 * @flow
 */
const padEnd = convertStringMethod('padEnd')

export { padEnd }
