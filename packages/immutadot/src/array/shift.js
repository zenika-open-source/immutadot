import { convertArrayMethod } from './convertArrayMethod'

/**
 * Replaces by an array of elements with first element removed.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @return {Object} Returns the updated object.
 * @example shift({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop') // => { nested: { prop: [2, 3, 4] } }
 * @see {@link https://mdn.io/Array.prototype.shift|Array.prototype.shift} for more information.
 * @since 1.0.0
 * @flow
 */
const shift = convertArrayMethod('shift')

export { shift }
