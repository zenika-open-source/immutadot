import _defaults from 'lodash/fp/defaults'
import { convertLodashFp } from 'util/convertLodashFp'

/**
 * Replaces by an object assigning own and inherited enumerable string keyed properties of source objects to the destination object for all destination properties that resolve to <code>undefined</code>.<br >
 * Source objects are applied from left to right. Once a property is set, additional values of the same property are ignored.
 * @function
 * @memberof object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Object} [sources] The source objects.
 * @return {Object} Returns the updated object.
 * @example defaults({ nested: { a: 1, b: 2 } }, 'nested', { b: 3, c: 4 }) // => { nested: { a:1, b: 2, c: 4 } }
 * @see {@link https://lodash.com/docs#defaults|lodash.defaults} for more information.
 * @since 1.0.0
 */
const defaults = convertLodashFp(_defaults)
export { defaults }
