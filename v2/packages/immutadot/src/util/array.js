/**
 * Flattens an array.
 * @param {Array} arr The array to flatten.
 * @returns {Array} The flattened array.
 * @memberof util
 * @private
 * @since 1.0.0
 */
export function flatten(arr) {
  return arr.reduce(
    (flat, val) => Array.isArray(val) ? flat.concat(val) : [...flat, val],
    [],
  )
}
