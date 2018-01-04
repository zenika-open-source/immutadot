import { convertStringMethod } from './convertStringMethod'

/**
 * Replaces by former string stripped of whitespaces at end.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @return {Object} Returns the updated object.
 * @example trimRight({ nested: { a: '   Hello world !   ' } }) // => { nested: { a: '   Hello world !' } }
 * @see {@link https://mdn.io/String.prototype.trimRight|String.prototype.trimRight} for more information.
 * @since 1.0.0
 */
const trimRight = convertStringMethod('trimRight')

export { trimRight }
