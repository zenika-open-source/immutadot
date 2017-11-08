import {
  isNaturalInteger,
} from 'util/lang'

/**
 * This is an alias for {@link util/isNaturalInteger}.
 * @function
 * @memberof core
 * @private
 * @since 0.4.0
 */
const isIndex = isNaturalInteger

/**
 * Tests whether <code>arg</code> is a valid slice index, that is an integer or <code>undefined</code>.
 * @function
 * @param {*} arg The value to test
 * @return {boolean} True if <code>arg</code> is a valid slice index, false otherwise
 * @memberof core
 * @private
 * @since 0.4.0
 */
const isSliceIndex = arg => arg === undefined || Number.isSafeInteger(arg)

/**
 * Tests whether <code>arg</code> is a "slice", that is an array containing exactly 2 slice indexes.
 * @function
 * @param {*} arg The value to test
 * @return {boolean} True if <code>arg</code> is a slice, false otherwise
 * @memberof core
 * @private
 * @since 0.4.0
 */
const isSlice = arg => {
  if (!Array.isArray(arg)) return false
  if (arg.length !== 2) return false
  return isSliceIndex(arg[0]) && isSliceIndex(arg[1])
}

/**
 * Tests whether <code>arg</code> is either an index or a slice.
 * @function
 * @param {*} arg The value to test
 * @return {boolean} True if <code>arg</code> is either an index or a slice, false otherwise
 * @memberof core
 * @private
 * @since 0.4.0
 */
const isArrayProp = arg => isIndex(arg) || isSlice(arg)

export {
  isArrayProp,
  isIndex,
  isSlice,
  isSliceIndex,
}
