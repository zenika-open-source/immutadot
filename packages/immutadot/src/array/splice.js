import { convertArrayMethod } from './convertArrayMethod'

/**
 * Replaces an array removing and/or adding elements at <code>index</code> in the former array.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} start Index at which to start changing the array.
 * @param {number} [deleteCount] The number of old array elements to remove.
 * @param {...*} values The values to add.
 * @return {Object} Returns the updated object.
 * @example splice({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', 1, 2, 5, 6) // => { nested: { prop: [1, 5, 6, 4] } }
 * @see {@link https://mdn.io/Array.prototype.splice|Array.prototype.splice} for more information.
 * @since 0.2.0
 * @flow
 */
const splice = convertArrayMethod('splice')

export { splice }
