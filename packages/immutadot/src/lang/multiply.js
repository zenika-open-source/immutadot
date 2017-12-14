import { convert } from 'core/convert'

/**
 * Replaces by the multiplication of the former number and the given number.
 * @function
 * @memberof lang
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} multiplicand The second number in the multiplication.
 * @return {Object} Returns the updated object.
 * @example multiply({ nested: { prop: 333 } }, 'nested.prop', 2) // => { nested: { prop: 666 } }
 * @since 1.0.0
 * @flow
 */
const multiply = convert((value, multiplier) => value * multiplier)

export { multiply }
