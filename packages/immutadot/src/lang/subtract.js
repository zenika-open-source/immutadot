import { convert } from 'core/convert'

/**
 * Replaces by the subtraction of the former number by the given number.
 * @function
 * @memberof lang
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} subtrahend The number to subtract.
 * @return {Object} Returns the updated object.
 * @example subtract({ nested: { prop: 2000 } }, 'nested.prop', 336) // => { nested: { prop: 1664 } }
 * @since 1.0.0
 * @flow
 */
const subtract = convert((value, subtraction) => Number(value) - Number(subtraction))

export { subtract }
