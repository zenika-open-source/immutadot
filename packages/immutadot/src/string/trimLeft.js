import { convertStringMethod } from './convertStringMethod'

/**
 * Replaces by former string stripped of whitespaces at start.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @return {Object} Returns the updated object.
 * @example trimLeft({ nested: { a: '   Hello world !   ' } }) // => { nested: { a: 'Hello world !   ' } }
 * @see {@link https://mdn.io/String.prototype.trimLeft|String.prototype.trimLeft} for more information.
 * @since 1.0.0
 */
const trimLeft = convertStringMethod('trimLeft')

export { trimLeft }
