import { convert } from 'core/convert'

/**
 * Replaces by the addition of the former number and the given number.
 * @function
 * @memberof lang
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} addend The number to add.
 * @return {Object} Returns the updated object.
 * @example add({ nested: { prop: 2 } }, 'nested.prop', 4) // => { nested: { prop: 6 } }
 * @since 1.0.0
 * @flow
 */
const add = convert((value, addition) => Number(value) + Number(addition))

export { add }
