import _drop from 'lodash/drop'
import { convert } from 'core/convert'

/**
 * Replaces an array dropping one or several elements at the start of the former array.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} [n=1] The number of elements to drop.
 * @return {Object} Returns the updated object.
 * @example drop({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', 2) // => { nested: { prop: [3, 4] } }
 * @see {@link https://lodash.com/docs#drop|lodash.drop} for more information.
 * @since 0.2.0
 * @flow
 */
const drop = convert(_drop)
export { drop }
