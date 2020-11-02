import { difference as _difference } from 'lodash'
import { apply } from 'immutadot/core'

/**
 * Replaces an array removing values in the other given arrays from the former array.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Array} values The arrays of values to exclude.
 * @return {Object} Returns the updated object.
 * @example difference({ nested: { prop: [1, 2] } }, 'nested.prop', [2, 3]) // => { nested: { prop: [1] } }
 * @see {@link https://lodash.com/docs#difference|lodash.difference} for more information.
 * @since 1.0.0
 */
const difference = apply(_difference, { arity: 2 })

export { difference }
