/**
 * Tests whether <code>arg</code> is a valid index, that is a positive integer.
 * @param {*} arg The value to test
 * @return {boolean} True if <code>arg</code> is a valid index, false otherwise
 * @memberof util
 * @private
 * @since 0.4.0
 */
const isIndex = arg => Number.isSafeInteger(arg) && arg >= 0

/**
 * Tests whether <code>arg</code> is a Symbol.
 * @param {*} arg The value to test
 * @return {boolean} True if <code>arg</code> is a Symbol, false otherwise
 * @memberof util
 * @private
 * @since 0.4.0
 * @see {@link https://mdn.io/Symbol|Symbol} for more information.
 */
const isSymbol = arg => typeof arg === 'symbol'

/**
 * Converts <code>arg</code> to a string using string interpolation.
 * @param {*} arg The value to convert
 * @return {string} The string representation of <code>arg</code>
 * @memberof util
 * @private
 * @since 0.4.0
 */
const toString = arg => typeof arg === 'string' ? arg : `${arg}`

export {
  isIndex,
  isSymbol,
  toString,
}
