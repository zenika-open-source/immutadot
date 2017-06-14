import assign from 'lodash/fp/assign'
import { lodashFpConvertOptions } from '../core/consts'
import update from '../core/update'

const rawAssign = assign.convert(lodashFpConvertOptions)

/**
 * Applies <code>!</code> to the property.
 * @function assign
 * @memberof object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {Array|Object} sources The source objects.
 * @return {Object} Returns the updated object.
 * @example assign({ nested: { a: 1, b: 2 } }, 'nested', { b: 3, c: 4 }) // => { nested: { a:1, b: 3, c: 4 } }
 * @see {@link core.update|update} for more information.
 * @since 0.1.5
 */
export default update(rawAssign)
