import { convert } from 'core/convert'

/**
 * Applies <code>&&</code> between the former value and <code>args</code>
 * @function
 * @memberof lang
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...boolean} [args] Other operands.
 * @return {Object} Returns the updated object.
 * @example and({ nested: { prop: true } }, 'nested.prop', true) // { nested: { prop: true } }
 * @example and({ nested: { prop: true } }, 'nested.prop', true, false) // { nested: { prop: false } }
 * @since 1.0.0
 */
const and = convert((v, ...args) => args.reduce((acc, arg) => acc && arg, v))

export { and }
