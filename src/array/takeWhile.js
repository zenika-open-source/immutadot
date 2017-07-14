import _takeWhile from 'lodash/takeWhile'
import convert from '../util/convert'

/**
 * Creates a slice of array with elements taken from the beginning.
 * Elements are taken until predicate returns falsey.
 * The predicate is invoked with three arguments: (value, index, array).
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {Function} [predicate={@link https://lodash.com/docs#identity|lodash.identity}] The function invoked per iteration.
 * @return {Object} Returns the updated object.
 * @example takeWhile({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', v => v < 2) // => { nested: { prop: [1] } }
 * @see {@link https://lodash.com/docs#takeWhile|lodash.takeWhile} for more information.
 * @since 0.3.0
 */
const takeWhile = convert(_takeWhile)
export default takeWhile
