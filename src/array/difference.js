import _difference from 'lodash/difference'
import { convert } from '../util/convert'

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
 * @since 0.2.0
 */
const difference = convert(_difference)
export { difference, difference as default }
