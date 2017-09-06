import _pull from 'lodash/pull'
import { convert } from 'util/convert'

/**
 * Replaces an array removing all given values from the former array.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...*} values The values to remove.
 * @return {Object} Returns the updated object.
 * @example pull({ nested: { prop: [1, 2, 3, 1, 2, 3] } }, 'nested.prop', 1, 3) // => { nested: { prop: [2, 2] } }
 * @see {@link https://lodash.com/docs#pull|lodash.pull} for more information.
 * @since 0.2.0
 */
const pull = convert(_pull)
export { pull }
