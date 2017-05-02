import fpUnset from 'lodash/fp/unset'
import { lodashFpConvertOptions } from './consts'

/**
 * Removes the property at <code>path</code> of <code>object</code>.
 * This is the <code>lodash/fp</code> <code>unset</code>, with no arguments rearranging and no currying.
 * @function unset
 * @memberof core
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to unset.
 * @return {Object} Returns the updated object.
 * @example unset({ nested: { prop: 'value' } }, 'nested.prop') // => { nested: {} }
 * @see {@link https://lodash.com/docs#unset|lodash.unset} for more information.
 * @since 0.1.5
 */
export default fpUnset.convert(lodashFpConvertOptions)
