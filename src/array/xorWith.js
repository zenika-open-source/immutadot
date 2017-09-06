import _xorWith from 'lodash/xorWith'
import { convert } from '../util/convert'

/**
 * This method is like {@link array.xor} except that it accepts <code>comparator</code> to compare elements.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Array} arrays The arrays to inspect.
 * @param {Function} [comparator] The comparator invoked per element.
 * @return {Object} Returns the updated object.
 * @example xorWith({ nested: { prop: [{ x: 1 }, { x: 2 }] } }, 'nested.prop', [{ x: 2 }, { x: 3 }], (a, b) => a.x === a.b) // => { nested: { prop: [{ x: 1 }, { x: 3 }] } }
 * @see {@link https://lodash.com/docs#xorWith|lodash.xorWith} for more information.
 * @since 0.3.0
 */
const xorWith = convert(_xorWith)
export { xorWith }
