import _pickBy from 'lodash/pickBy'
import { convert } from '../util/convert'

/**
 * Creates an object composed of the object properties predicate returns truthy
 * for. The predicate is invoked with two arguments: (value, key).
 * @function
 * @memberof object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {function} [predicate={@link https://lodash.com/docs#identity|lodash.identity}] The function invoked per iteration.
 * @return {Object} Returns the updated object.
 * @example pickBy({ nested: { a: 1, b: 2, c: 3, d: 4 } }, 'nested', v => v < 3) // => { nested: { a: 1, b: 2 } }
 * @see {@link https://lodash.com/docs#pickBy|lodash.pickBy} for more information.
 * @see {@link https://lodash.com/docs#identity|lodash.identity} for more information.
 * @since 0.1.12
 */
const pickBy = convert(_pickBy)
export { pickBy, pickBy as default }
