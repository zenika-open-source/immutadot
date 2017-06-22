import fpSet from 'lodash/fp/set'
import { lodashFpConvertOptions } from '../consts'

/**
 * Sets the value at <code>path</code> of <code>object</code>.
 * This is the <code>lodash/fp</code> <code>set</code>, with no arguments rearranging and no currying.
 * @function set
 * @memberof object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @return {Object} Returns the updated object.
 * @example set({ nested: { prop: 'old' } }, 'nested.prop', 'new') // => { nested: { prop: 'new' } }
 * @see {@link https://lodash.com/docs#set|lodash.set} for more information.
 * @since 0.1.5
 */
export default fpSet.convert(lodashFpConvertOptions)
