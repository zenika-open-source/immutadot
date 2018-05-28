import {
  list,
  slice,
} from '@immutadot/parser'

export const getArrayIndex = (value, length) => {
  if (value < 0) {
    if (-value > length) return undefined
    return Math.max(length + value, 0)
  }
  return value
}

const getSliceBound = (value, length) => {
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
  getSliceBound(start, length),
  getSliceBound(end === undefined ? length : end, length),
])

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
  if (pAppliedPaths === undefined) return false
  const appliedPaths = pAppliedPaths.filter(
    appliedPath => !appliedPath.some(([propType]) => propType === slice || propType === list),
  )
  if (appliedPaths.length === 0) return false
  if (path.length === 0 && appliedPaths.length !== 0) return true
  return appliedPaths.some(appliedPath => pathIncludes(appliedPath, path))
}

function pathIncludes(path, otherPath) {
  if (otherPath.length > path.length) return false
  return otherPath.every(([, otherProp], i) => {
    const [, prop] = path[i]
    return prop === otherProp
  })
}
