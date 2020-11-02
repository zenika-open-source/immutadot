import { applyArrayMethod } from './applyArrayMethod'

/**
 * Replaces an array mapping each element using a mapping function, then flattening the result into a new array.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {function} callback The function invoked per iteration.
 * @return {Object} Returns the updated object.
 * @see {@link https://mdn.io/Array.prototype.flatMap|Array.prototype.flatMap} for more information.
 * @since 2.0.0
 */
const flatMap = applyArrayMethod('flatMap', { mutating: false })

export { flatMap }
