import _unionBy from 'lodash/unionBy'
import { convert } from 'core/convert'

/**
 * This method is like {@link array.union} except that it accepts <code>iteratee</code> to generate the criterion by which elements are compared.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} [iteratee={@link https://lodash.com/docs#identity|lodash.identity}] The iteratee invoked per element.
 * @return {Object} Returns the updated object.
 * @example unionBy({ nested: { prop: [{ x: 1 }, { x: 2 }] } }, 'nested.prop', [{ x: 2 }, { x: 3 }], 'x') // => { nested: { prop: [{ x: 1 }, { x: 2 }, { x: 3 }] } }
 * @see {@link https://lodash.com/docs#unionBy|lodash.unionBy} for more information.
 * @since 0.3.0
 */
const unionBy = convert(_unionBy)
export { unionBy }
