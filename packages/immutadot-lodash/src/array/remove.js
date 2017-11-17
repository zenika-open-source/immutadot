import _remove from 'lodash/fp/remove'
import { convertLodashFp } from 'immutadot/util/convert'

/**
 * Replaces an array removing elements that predicate returns truthy for from the former array.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {Function} [predicate={@link https://lodash.com/docs#identity|lodash.identity}] The function invoked per iteration.
 * @return {Object} Returns the updated object.
 * @example remove({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', v => v > 2) // => { nested: { prop: [1, 2] } }
 * @see {@link https://lodash.com/docs#remove|lodash.remove} for more information.
 * @since 1.0.0
 * @flow
 */
const remove = convertLodashFp(_remove)
export { remove }
