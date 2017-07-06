import convert from '../util/convert'
import xor from 'lodash/xor'

/**
 * Replaces an array by the symmetric difference of the former array and the given arrays.
 * @function xor
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Array} arrays The arrays to inspect.
 * @return {Object} Returns the updated object.
 * @example xor({ nested: { prop: [1, 2] } }, 'nested.prop', [2, 3]) // => { nested: { prop: [1, 3] } }
 * @see {@link https://lodash.com/docs#xor|lodash.xor} for more information.
 * @since 0.1.6
 */
export default convert(xor)
