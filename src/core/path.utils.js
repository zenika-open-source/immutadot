/**
 * Tests whether <code>arg</code> is a valid index, that is a positive integer.
 * @param {*} arg The value to test
 * @return {boolean} True if <code>arg</code> is a valid index, false otherwise
 * @memberof core
 * @private
 * @since 0.4.0
 */
const isIndex = arg => Number.isSafeInteger(arg) && arg >= 0

/**
 * Tests whether <code>arg</code> is a valid slice index, that is an integer or <code>undefined</code>.
 * @param {*} arg The value to test
 * @return {boolean} True if <code>arg</code> is a valid slice index, false otherwise
 * @memberof core
 * @private
 * @since 0.4.0
 */
const isSliceIndex = arg => arg === undefined || Number.isSafeInteger(arg)

/**
 * Tests whether <code>arg</code> is a "slice", that is an array containing exactly 2 slice indexes.
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
