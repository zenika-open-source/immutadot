import { applyStringMethod } from './applyStringMethod'

/**
 * Replaces by former string padded at the start with <code>padString</code> to the given <code>length</code>.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} targetLength The length to pad to.
 * @param {string} [padString=' '] String to add.
 * @return {Object} Returns the updated object.
 * @example padStart({ nested: { a: 'Hellow' } }, 10) // => { nested: { a: '    Hellow' } }
 * @example padStart({ nested: { a: 'Hellow' } }, 10, '?!') // => { nested: { a: '?!?!Hellow' } }
 * @see {@link https://mdn.io/String.prototype.padStart|String.prototype.padStart} for more information.
 * @since 1.0.0
 */
const padStart = applyStringMethod(String.prototype.padStart)

export { padStart }
