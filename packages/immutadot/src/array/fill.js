import { convertArrayMethod } from './convertArrayMethod'

/**
 * Replaces by an array filled with value from start up to, but not including, end.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to fill array with.
 * @param {number} [start=0]
 * @param {number} [end=array.length]
 * @return {Object} Returns the updated object.
 * @example fill({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', 6, 1, 3) // => { nested: { prop: [1, 6, 6, 4] } }
 * @see {@link https://mdn.io/Array.prototype.fill|Array.prototype.fill} for more information.
 * @since 0.3.0
 */
const fill = convertArrayMethod('fill')

export { fill }
