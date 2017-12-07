import {
  isNaturalInteger,
} from 'util/lang'

import {
  slice,
} from './consts'

export const getSliceBound = (value, defaultValue, length) => {
  if (value === undefined) return defaultValue
  if (value < 0) return Math.max(length + value, 0)
  return value
}

/**
 * Get the actual bounds of a slice.
 * @function
 * @memberof path
 * @param {Array<number>} bounds The bounds of the slice
 * @param {number} length The length of the actual array
 * @returns {Array<number>} The actual bounds of the slice
 * @private
 * @since 1.0.0
 */
export const getSliceBounds = ([start, end], length) => ([
  getSliceBound(start, 0, length),
  getSliceBound(end, length, length),
])

/**
 * This is an alias for {@link util/isNaturalInteger}.
 * @function
 * @memberof path
 * @private
 * @since 1.0.0
 */
export const isIndex = isNaturalInteger

/**
 * Tests whether <code>arg</code> is a valid slice index, that is an integer or <code>undefined</code>.
 * @function
 * @param {*} arg The value to test
 * @return {boolean} True if <code>arg</code> is a valid slice index, false otherwise
 * @memberof path
 * @private
 * @since 1.0.0
 */
export const isSliceIndex = arg => arg === undefined || Number.isSafeInteger(arg)

/**
 * Tests whether <code>path</code> has already been applied using a list of already applied paths.
 * @param {Array} path The path to test.
 * @param {Array} pAppliedPaths Already applied paths.
 * @returns {boolean} <code>true></code> if <code>path</code> has already been applied, <code>false</code> otherwise.
 * @memberof path
 * @private
 * @since 1.0.0
 */
export function pathAlreadyApplied(path, pAppliedPaths) {
  const appliedPaths = pAppliedPaths.filter(appliedPath => !appliedPath.some(([propType]) => propType === slice))
  if (appliedPaths.length === 0) return false
  if (path.length === 0 && appliedPaths.length !== 0) return true
  return appliedPaths.some(appliedPath => pathIncludes(appliedPath, path))
}

function pathIncludes(path, otherPath) {
  if (otherPath.length > path.length) return false
  return otherPath.every((otherProp, i) => path[i] === otherProp)
}
