import {
  isNaturalInteger,
} from 'util/lang'

const getSliceBound = (value, defaultValue, length) => {
  if (value === undefined) return defaultValue
  if (value < 0) return Math.max(length + value, 0)
  return value
}

/**
 * Get the actual bounds of a slice.
 * @function
 * @memberof core
 * @param {Array<number>} bounds The bounds of the slice
 * @param {number} length The length of the actual array
 * @returns {Array<number>} The actual bounds of the slice
 * @private
 * @since 1.0.0
 */
const getSliceBounds = ([start, end], length) => ([
  getSliceBound(start, 0, length),
  getSliceBound(end, length, length),
])

/**
 * This is an alias for {@link util/isNaturalInteger}.
 * @function
 * @memberof core
 * @private
 * @since 1.0.0
 */
const isIndex = isNaturalInteger

/**
 * Tests whether <code>arg</code> is a valid slice index, that is an integer or <code>undefined</code>.
 * @function
 * @param {*} arg The value to test
 * @return {boolean} True if <code>arg</code> is a valid slice index, false otherwise
 * @memberof core
 * @private
 * @since 1.0.0
 */
const isSliceIndex = arg => arg === undefined || Number.isSafeInteger(arg)

/**
 * Tests whether <code>arg</code> is a "slice", that is an array containing exactly 2 slice indexes.
 * @function
 * @param {*} arg The value to test
 * @return {boolean} True if <code>arg</code> is a slice, false otherwise
 * @memberof core
 * @private
 * @since 1.0.0
 */
const isSlice = arg => {
  if (!Array.isArray(arg)) return false
  if (arg.length !== 2) return false
  return isSliceIndex(arg[0]) && isSliceIndex(arg[1])
}

export {
  getSliceBounds,
  isIndex,
  isSlice,
  isSliceIndex,
}
