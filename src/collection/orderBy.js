import _orderBy from 'lodash/orderBy'
import { convert } from 'core/convert'

/**
 * Replaces by an array of sorted by <code>iteratees</code> in specified <code>orders</code>.
 * @function
 * @memberof collection
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[{@link https://lodash.com/docs#identity|lodash.identity}]] The iteratees to sort by.
 * @param {string[]} [orders] The sort orders of <code>iteratees</code>.
 * @return {Object} Returns the updated object.
 * @see {@link https://lodash.com/docs#orderBy|lodash.orderBy} for more information.
 * @example
 * orderBy({ nested: { prop: [{ name: 'Yvo', age: 2 }, { name: 'Nico', age: 666 }, { name: 'Nico', age: 30 }] } }, 'nested.prop', ['name', 'age'], ['asc', 'desc'])
 * // => { nested: { prop: [{ name: 'Nico', age: 666 }, { name: 'Nico', age: 30 }, { name: 'Yvo', age: 2 }] } }
 * @since 0.3.0
 * @flow
 */
const orderBy = convert(_orderBy)
export { orderBy }
