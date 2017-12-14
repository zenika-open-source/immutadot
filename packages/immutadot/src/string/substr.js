import { convertStringMethod } from './convertStringMethod'

/**
 * Replaces by a slice of former string starting at <code>beginIndex</code> and ending at <code>endIndex</code> or end of the string.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} beginIndex Beginning index of slice.
 * @param {number?} endIndex Ending index of slice.
 * @return {Object} Returns the updated object.
 * @example substr({ nested: { a: 'Hello World !' } }, 6) // => { nested: { a: 'World !' } }
 * @example substr({ nested: { a: 'Hello World !' } }, 6, 11) // => { nested: { a: 'World' } }
 * @see {@link https://mdn.io/String.prototype.substr|String.prototype.substr} for more information.
 * @since 1.0.0
 * @flow
 */
const substr = convertStringMethod('substr')

export { substr }
