/**
 * Tests whether <code>arg</code> is a valid index, that is a positive integer.
 * @param {*} arg The value to test
 * @return {boolean} True if <code>arg</code> is a valid index, false otherwise
 * @memberof core
 * @private
 * @since 0.4.0
 */
const isIndex = arg => Number.isSafeInteger(arg) && arg >= 0

export {
  isIndex,
}
