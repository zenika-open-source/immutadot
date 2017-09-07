import _pullAllWith from 'lodash/pullAllWith'
import { convert } from 'util/convert'

/**
 * This method is like {@link array.pullAll} except that it accepts <code>comparator</code> to compare elements.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {Array} values The values to remove.
 * @param {Function} [comparator] The comparator invoked per element.
 * @return {Object} Returns the updated object.
 * @example pullAllWith({ nested: { prop: [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }, { x: 2 }, { x: 3 }] } }, 'nested.prop', [{ x: 1 }, { x: 3 }], (a, b) => a.x === b.x) // => { nested: { prop: [{ x: 2 }, { x: 2 }] } }
 * @see {@link https://lodash.com/docs#pullAllWith|lodash.pullAllWith} for more information.
 * @since 0.3.0
 */
const pullAllWith = convert(_pullAllWith)
export { pullAllWith, pullAllWith as default }
