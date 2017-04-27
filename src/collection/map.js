import map from 'lodash/map'
import update from '../core/update'

/**
 * Replaces by an array of values by running each element in the former collection thru iteratee.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * @function map
 * @memberof collection
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {Function} [iteratee=Lodash.identity] The function invoked per iteration.
 * @return {Object} Returns the updated object.
 * @see {@link https://lodash.com/docs#map|Lodash.map} for more information.
 * @see {@link https://lodash.com/docs#identity|Lodash.identity} for more information.
 * @since 0.1.8
 */
export default update(map)
