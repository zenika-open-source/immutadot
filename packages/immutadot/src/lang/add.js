import { apply } from 'core/apply'

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
 */
const add = apply((value, addend) => Number(value) + Number(addend), { fixedArity: true })

export { add }
