import _map from 'lodash/map'
import { convert } from 'core'

/**
 * Replaces by an array of values by running each element in the former collection thru iteratee.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * @function
 * @memberof collection
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {function} [iteratee={@link https://lodash.com/docs#identity|lodash.identity}] The function invoked per iteration.
 * @return {Object} Returns the updated object.
 * @see {@link https://lodash.com/docs#map|lodash.map} for more information.
 * @example map({ nested: { prop: [1, 2, 3] } }, 'nested.prop', v => v * 2) // => { nested: { prop: [2, 4, 6] } }
 * @since 0.1.8
 */
const map = convert(_map)
export { map }
