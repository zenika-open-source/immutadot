import { apply } from 'core/apply'

/**
 * Replaces by the division of the former number and the given number.
 * @function
 * @memberof lang
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} divisor The second number in the division.
 * @return {Object} Returns the updated object.
 * @example divide({ nested: { prop: 1332 } }, 'nested.prop', 2) // => { nested: { prop: 666 } }
 * @since 1.0.0
 */
const divide = apply((value, divider) => Number(value) / Number(divider), { fixedArity: true })

export { divide }
