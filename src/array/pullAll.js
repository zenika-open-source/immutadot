import _pullAll from 'lodash/pullAll'
import { convert } from 'util/convert'

/**
 * This method is like {@link array.pull} except that it accepts an array of values to remove.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {Array} values The values to remove.
 * @return {Object} Returns the updated object.
 * @example pullAll({ nested: { prop: [1, 2, 3, 1, 2, 3] } }, 'nested.prop', [1, 3]) // => { nested: { prop: [2, 2] } }
 * @see {@link https://lodash.com/docs#pullAll|lodash.pullAll} for more information.
 * @since 0.3.0
 */
const pullAll = convert(_pullAll)
export { pullAll }
