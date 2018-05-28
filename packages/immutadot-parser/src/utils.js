/**
 * Tests whether <code>arg</code> is a <code>undefined</code> or <code>null</code>.
 * @function
 * @param {*} arg The value to test
 * @return {boolean} True if <code>arg</code> is <code>undefined</code> or <code>null</code>, false otherwise
 * @memberof util
 * @private
 * @since 1.0.0
 */
const isNil = arg => arg === undefined || arg === null

/**
 * Converts <code>arg</code> to a string using string interpolation.
 * @param {*} arg The value to convert
 * @return {string} The string representation of <code>arg</code>
 * @memberof util
 * @private
 * @since 1.0.0
 */
const toString = arg => typeof arg === 'string' ? arg : `${arg}`

/**
 * This is an alias for {@link util/isNaturalInteger}.
 * @function
 * @memberof path
 * @private
 * @since 1.0.0
 */
const isIndex = Number.isSafeInteger

/**
 * Tests whether <code>arg</code> is a valid slice index, that is an integer or <code>undefined</code>.
 * @function
 * @param {*} arg The value to test
 * @return {boolean} True if <code>arg</code> is a valid slice index, false otherwise
 * @memberof path
 * @private
 * @since 1.0.0
 */
const isSliceIndex = arg => arg === undefined || Number.isSafeInteger(arg)

export {
  isIndex,
  isNil,
  isSliceIndex,
  toString,
}
