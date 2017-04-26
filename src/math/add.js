import add from 'lodash/add'
import update from '../core/update'

/**
 * Replaces by the addition of the former number and the given number.
 * @function add
 * @memberof math
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} addend The number to add.
 * @return {Object} Returns the updated object.
 * @example add({ nested: { prop: 2 } }, 'nested.prop', 4) // => { nested: { prop: 6 } }
 * @see {@link https://lodash.com/docs#add|Lodash.add} for more information
 * @since 0.1.7
 */
export default update(add)
