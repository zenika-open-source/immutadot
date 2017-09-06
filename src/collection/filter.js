import _filter from 'lodash/filter'
import { convert } from 'util/convert'

/**
 * Replaces by an array of elements <code>predicate</code> returns truthy for.
 * @function
 * @memberof collection
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {function} [predicate={@link https://lodash.com/docs#identity|lodash.identity}] The function invoked per iteration.
 * @return {Object} Returns the updated object.
 * @see {@link https://lodash.com/docs#filter|lodash.filter} for more information.
 * @example filter({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', v => v % 2) // => { nested: { prop: [1, 3] } }
 * @since 0.3.0
 */
const filter = convert(_filter)
export { filter }
