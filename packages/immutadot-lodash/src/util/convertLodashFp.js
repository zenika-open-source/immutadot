import { convert } from 'immutadot/core/convert'
import { lodashFpConvert } from './lodashFpConvert'

/**
 * Converts and wraps a lodash/fp function.
 * @memberof util
 * @param {function} fn The lodash/fp function.
 * @return {function} Returns the wrapped function.
 * @see {@link util.convert|convert} for more information.
 * @since 0.2.0
 * @private
 */
const convertLodashFp = fn => convert(lodashFpConvert(fn))

/**
 * This is an alias for {@link core.convert}.
 * @memberof object
 * @function convert
 * @deprecated Use {@link core.convert}
 * @since 0.2.0
 */
export {
  convertLodashFp,
}
