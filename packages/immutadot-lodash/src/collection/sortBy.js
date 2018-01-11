import { sortBy as _sortBy } from 'lodash'
import { convert } from 'immutadot'

/**
 * Replaces by an array of sorted by <code>iteratees</code>.
 * @function
 * @memberof collection
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[{@link https://lodash.com/docs#identity|lodash.identity}]] The iteratees to sort by.
 * @return {Object} Returns the updated object.
 * @see {@link https://lodash.com/docs#sortBy|lodash.sortBy} for more information.
 * @example
 * sortBy({ nested: { prop: [{ name: 'Yvo', age: 2 }, { name: 'Nico', age: 666 }, { name: 'Nico', age: 30 }] } }, 'nested.prop', ['name', 'age'])
 * // => { nested: { prop: [{ name: 'Nico', age: 30 }, { name: 'Nico', age: 666 }, { name: 'Yvo', age: 2 }] } }
 * @since 1.0.0
 */
const sortBy = convert(_sortBy)
export { sortBy }
