import update from '../core/update'
import xor from 'lodash/xor'

/**
 * Replaces by an array of unique values that is the symmetric difference of the former array and the given arrays.
 * @function xor
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Array} arrays The arrays to inspect.
 * @return {Array} Returns the new array of filtered values.
 * @see {@link https://lodash.com/docs#xor|Lodash} for more information
 * @since 0.1.6
 */
export default update(xor)
