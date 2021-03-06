import { intersectionBy as _intersectionBy } from 'lodash'
import { apply } from 'immutadot/core'

/**
 * This method is like {@link array.intersection} except that it uses <code>iteratee</code> to generate the value to be compared for each element.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} [iteratee={@link https://lodash.com/docs#identity|lodash.identity}] The iteratee invoked per element.
 * @return {Object} Returns the updated object.
 * @example intersectionBy({ nested: { prop: [1.2, 2.1] } }, 'nested.prop', [2.3, 3.2], Math.floor) // => { nested: { prop: [2.1] } }
 * @see {@link https://lodash.com/docs#intersectionBy|lodash.intersectionBy} for more information.
 * @since 1.0.0
 */
const intersectionBy = apply(_intersectionBy, { arity: 2 })

export { intersectionBy }
