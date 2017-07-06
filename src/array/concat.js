import concat from 'lodash/concat'
import convert from '../util/convert'

/**
 * Creates a new array concatenating array with any additional arrays and/or values.
 * @function concat
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Array} arrays The arrays to concatenate.
 * @return {Array} Returns the new concatenated array.
 * @example concat({ nested: { prop: [1, 2] } }, 'nested.prop', [3, 4]) // => { nested: { prop: [1, 2, 3, 4] } }
 * @see {@link https://lodash.com/docs#concat|lodash.concat} for more information.
 * @since 0.2.0
 */
export default convert(concat)
