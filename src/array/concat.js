import _concat from 'lodash/concat'
import { convert } from 'core'

/**
 * Replaces an array concatenating the former array with additional arrays and/or values.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Array} arrays The arrays to concatenate.
 * @return {Object} Returns the updated object.
 * @example concat({ nested: { prop: [1, 2] } }, 'nested.prop', [3, 4]) // => { nested: { prop: [1, 2, 3, 4] } }
 * @see {@link https://lodash.com/docs#concat|lodash.concat} for more information.
 * @since 0.2.0
 */
const concat = convert(_concat)
export { concat }
