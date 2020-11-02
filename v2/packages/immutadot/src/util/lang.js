/**
 * Tests whether <code>arg</code> is a function.
 * @function
 * @param {*} arg The value to test
 * @return {boolean} True if <code>arg</code> is a function, false otherwise
 * @memberof util
 * @private
 * @since 1.0.0
 */
const isFunction = arg => typeof arg === 'function'

/**
 * Tests whether <code>arg</code> is a natural integer.
 * @function
 * @param {*} arg The value to test
 * @return {boolean} True if <code>arg</code> is a natural integer, false otherwise
 * @memberof util
 * @private
 * @since 1.0.0
 */
const isNaturalInteger = arg => Number.isSafeInteger(arg) && arg >= 0

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
 * Tests whether <code>arg</code> is a string.
 * @function
 * @param {*} arg The value to test
 * @return {boolean} True if <code>arg</code> is a string, false otherwise
 * @memberof util
 * @private
 * @since 1.0.0
 */
const isString = arg => typeof arg === 'string'

/**
 * Returns the length of <code>arg</code>.
 * @function
 * @memberof util
 * @param {*} arg The value of which length must be returned
 * @returns {number} The length of <code>arg</code>
 * @private
 * @since 1.0.0
 */
const length = arg => {
  if (isNil(arg) || !isNaturalInteger(arg.length)) return 0
  return arg.length
}

/**
 * Converts <code>arg</code> to a string using string interpolation.
 * @param {*} arg The value to convert
 * @return {string} The string representation of <code>arg</code>
 * @memberof util
 * @private
 * @since 1.0.0
 */
const toString = arg => typeof arg === 'string' ? arg : `${arg}`

export {
  isFunction,
  isNaturalInteger,
  isNil,
  isString,
  length,
  toString,
}
