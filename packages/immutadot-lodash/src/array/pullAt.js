import _pullAt from 'lodash/fp/pullAt'
import { convertLodashFp } from '../util/convert'

/**
 * Replaces an array removing the specified indexes from the former array.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...(number|number[])} [indexes] The indexes of elements to remove.
 * @return {Object} Returns the updated object.
 * @example pullAt({ nested: { prop: [4, 3, 2, 1] } }, 'nested.prop', 1, 3) // => { nested: { prop: [4, 2] } }
 * @see {@link https://lodash.com/docs#pullAt|lodash.pullAt} for more information.
 * @since 1.0.0
 * @flow
 */
const pullAt = convertLodashFp(_pullAt)
export { pullAt }
