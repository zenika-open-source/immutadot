import _pullAllBy from 'lodash/pullAllBy'
import { convert } from '../util/convert'

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
 * @since 0.3.0
 */
const pullAllBy = convert(_pullAllBy)
export { pullAllBy }
