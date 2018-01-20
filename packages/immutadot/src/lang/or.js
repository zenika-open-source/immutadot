import { convert } from 'core/convert'

/**
 * Applies <code>||</code> between the former value and <code>args</code>
 * @function
 * @memberof lang
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...*} [args] Other operands.
 * @return {Object} Returns the updated object.
 * @example or({ nested: { prop: false } }, 'nested.prop', true) // { nested: { prop: true } }
 * @example or({ nested: { prop: true } }, 'nested.prop', false, false) // { nested: { prop: true } }
 * @since 1.0.0
 */
const or = convert((v, ...args) => args.reduce((acc, arg) => acc || arg, v))

export { or }
