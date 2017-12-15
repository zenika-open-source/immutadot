import { convertArrayMethod } from './convertArrayMethod'

/**
 * Replaces by a sorted array, in natural order or according to the optional <code>comparator</code>.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {function?} comparator The comparator function.
 * @return {Object} Returns the updated object.
 * @example sort({ nested: { prop: [2, 4, 3, 1] } }, 'nested.prop') // => { nested: { prop: [1, 2, 3, 4] } }
 * @example sort({ nested: { prop: [2, 4, 3, 1] } }, 'nested.prop', (a, b) => b - a) // => { nested: { prop: [4, 3, 2, 1] } }
 * @see {@link https://mdn.io/Array.prototype.sort|Array.prototype.sort} for more information.
 * @since 1.0.0
 * @flow
 */
const sort = convertArrayMethod('sort')

export { sort }
