import { applyArrayMethod } from './applyArrayMethod'

/**
 * Shallow copies part of an array to another location in the same array, without modifying its size.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} target Zero based index at which to copy the sequence to.
 * @param {number} [start] Zero based index at which to start copying elements from.
 * @param {number} [end] Zero based index at which to end copying elements from.
 * @return {Object} Returns the updated object.
 * @example copyWithin({ nested: { prop: [1, 2, 3, 4, 5] } }, 'nested.prop', 0, 3, 4) // => { nested: { prop: [4, 2, 3, 4, 5] } }
 * @see {@link https://mdn.io/Array.prototype.copyWithin|Array.prototype.copyWithin} for more information.
 * @since 2.0.0
 */
const copyWithin = applyArrayMethod(Array.prototype.copyWithin, {
  arity: 1,
  mutating: true,
})

export { copyWithin }
