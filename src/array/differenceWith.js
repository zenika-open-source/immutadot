import _differenceWith from 'lodash/differenceWith'
import { convert } from 'core'

/**
 * This method is like {@link array.difference} except that it uses <code>comparator</code> to compare elements of the former array to <code>values</code>.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Array} values The arrays of values to exclude.
 * @param {Function} [comparator] The comparator invoked per element.
 * @return {Object} Returns the updated object.
 * @example differenceWith({ nested: { prop: [{ x: 1 }, { x: 2 }] } }, 'nested.prop', [{ x: 2 }, { x: 3 }], (a, b) => a.x === b.x) // => { nested: { prop: [{ x: 1 }] } }
 * @see {@link https://lodash.com/docs#differenceWith|lodash.differenceWith} for more information.
 * @since 0.3.0
 */
const differenceWith = convert(_differenceWith)
export { differenceWith }
