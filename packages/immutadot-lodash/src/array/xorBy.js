import { xorBy as _xorBy } from 'lodash'
import { apply } from 'immutadot/core'

/**
 * This method is like {@link array.xor} except that it accepts <code>iteratee</code> to generate the criterion by which elements are compared.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Array} arrays The arrays to inspect.
 * @param {Function} [iteratee={@link https://lodash.com/docs#identity|lodash.identity}] The iteratee invoked per element.
 * @return {Object} Returns the updated object.
 * @example xorBy({ nested: { prop: [{ x: 1 }, { x: 2 }] } }, 'nested.prop', [{ x: 2 }, { x: 3 }], 'x') // => { nested: { prop: [{ x: 1 }, { x: 3 }] } }
 * @see {@link https://lodash.com/docs#xorBy|lodash.xorBy} for more information.
 * @since 1.0.0
 */
const xorBy = apply(_xorBy, { arity: 2 })

export { xorBy }
