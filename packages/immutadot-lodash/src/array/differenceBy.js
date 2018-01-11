import _differenceBy from 'lodash/differenceBy'
import { convert } from 'immutadot'

/**
 * This method is like {@link array.difference} except that it uses <code>iteratee</code> to generate the value to be compared for each element.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Array} values The arrays of values to exclude.
 * @param {Function} [iteratee={@link https://lodash.com/docs#identity|lodash.identity}] The iteratee invoked per element.
 * @return {Object} Returns the updated object.
 * @example differenceBy({ nested: { prop: [1.2, 3.4, 5.6] } }, 'nested.prop', [5.4, 2.1], Math.floor) // => { nested: { prop: [1.2, 3.4] } }
 * @see {@link https://lodash.com/docs#differenceBy|lodash.differenceBy} for more information.
 * @since 1.0.0
 */
const differenceBy = convert(_differenceBy)
export { differenceBy }
