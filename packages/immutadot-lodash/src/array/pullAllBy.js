import { pullAllBy as _pullAllBy } from 'lodash/fp'
import { convertLodashFp } from 'util/convertLodashFp'

/**
 * This method is like {@link array.pullAll} except that it accepts <code>iteratee</code> to generate the criterion by which each element is compared.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {Array} values The values to remove.
 * @param {Function} [iteratee={@link https://lodash.com/docs#identity|lodash.identity}] The iteratee invoked per element.
 * @return {Object} Returns the updated object.
 * @example pullAllBy({ nested: { prop: [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }, { x: 2 }, { x: 3 }] } }, 'nested.prop', [{ x: 1 }, { x: 3 }], 'x') // => { nested: { prop: [{ x: 2 }, { x: 2 }] } }
 * @see {@link https://lodash.com/docs#pullAllBy|lodash.pullAllBy} for more information.
 * @since 1.0.0
 */
const pullAllBy = convertLodashFp(_pullAllBy)
export { pullAllBy }
