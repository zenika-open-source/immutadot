import { applyArrayMethod } from './applyArrayMethod'

/**
 * Replaces an array by a new array with all sub-array elements concatenated into it recursively up to the specified depth.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} [depth] Depth level.
 * @return {Object} Returns the updated object.
 * @see {@link https://mdn.io/Array.prototype.flat|Array.prototype.flat} for more information.
 * @since 2.0.0
 */
const flat = applyArrayMethod('flat', { mutating: false })

export { flat }
