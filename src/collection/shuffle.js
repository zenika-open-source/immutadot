import _shuffle from 'lodash/shuffle'
import { convert } from 'util/convert'

/**
 * Replaces by an array of shuffled elements.
 * @function
 * @memberof collection
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @return {Object} Returns the updated object.
 * @see {@link https://lodash.com/docs#shuffle|lodash.shuffle} for more information.
 * @example shuffle({ nested: { prop: [1, 2, 3, 4, 5, 6, 7, 8, 9] } }, 'nested.prop') // => { nested: { prop: [7, 3, 9, 1, 4, 5, 6, 8, 2] } }
 * @since 0.3.0
 */
const shuffle = convert(_shuffle)
export { shuffle, shuffle as default }
