import _merge from 'lodash/fp/merge'
import { convertLodashFp } from 'util/convertLodashFp'

/**
 * Replaces by an object deeply merging own enumerable string keyed properties of source objects to the former object.<br />
 * Source objects are applied from left to right. Subsequent sources overwrite properties of previous sources.
 * @function
 * @memberof object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Object} [sources] The source objects.
 * @return {Object} Returns the updated object.
 * @example merge({ nested: { prop: { a: 1 } } }, 'nested', { prop: { a: 2, b: 3 } }) // => { nested: { prop: { a: 2, b: 3 } } }
 * @see {@link https://lodash.com/docs#merge|lodash.merge} for more information.
 * @since 1.0.0
 */
const merge = convertLodashFp(_merge)
export { merge }
