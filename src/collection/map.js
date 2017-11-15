import _map from 'lodash/map'
import { convert } from 'core/convert'

/**
 * Replaces by an array of values by running each element in the former collection thru iteratee.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * @function
 * @memberof collection
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {function} [iteratee={@link https://lodash.com/docs#identity|lodash.identity}] The function invoked per iteration.
 * @return {Object} Returns the updated object.
 * @playground
 * require("lodash/package.json")
 * const { map } = require("immutadot")
 * // On an array
 * map({ nested: { prop: [1, 2, 3] } }, 'nested.prop', v => v * 2) // => { nested: { prop: [2, 4, 6] } }
 * // On a map
 * map({ nested: { prop: { a: 1, b: 2, c: 3 } } }, 'nested.prop', v => v * v) // => { nested: { prop: [1, 4, 9] } }
 * @see {@link https://lodash.com/docs#map|lodash.map} for more information.
 * @since 0.1.8
 * @flow
 */
const map = convert(_map)
export { map }
