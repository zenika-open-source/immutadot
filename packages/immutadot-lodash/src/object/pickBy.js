import { pickBy as _pickBy } from 'lodash'
import { apply } from 'immutadot/core'

/**
 * Replaces by an object picking properties that <code>predicate</code> returns truthy for.
 * @function
 * @memberof object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {function} [predicate={@link https://lodash.com/docs#identity|lodash.identity}] The function invoked per iteration.
 * @return {Object} Returns the updated object.
 * @example pickBy({ nested: { a: 1, b: 2, c: 3, d: 4 } }, 'nested', v => v < 3) // => { nested: { a: 1, b: 2 } }
 * @see {@link https://lodash.com/docs#pickBy|lodash.pickBy} for more information.
 * @since 1.0.0
 */
const pickBy = apply(_pickBy, { arity: 1 })

export { pickBy }
