/**
 * Tests whether <code>arg</code> is a natural integer.
 * @function
 * @param {*} arg The value to test
 * @return {boolean} True if <code>arg</code> is a natural integer, false otherwise
 * @memberof util
 * @private
 * @since 0.4.0
 */
const isNaturalInteger = arg => Number.isSafeInteger(arg) && arg >= 0

/**
 * Tests whether <code>arg</code> is a <code>undefined</code> or <code>null</code>.
 * @function
 * @param {*} arg The value to test
 * @return {boolean} True if <code>arg</code> is <code>undefined</code> or <code>null</code>, false otherwise
 * @memberof util
 * @private
 * @since 0.4.0
 */
const isNil = arg => arg === undefined || arg === null

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
  isNaturalInteger,
  isNil,
  isSymbol,
  toString,
}
