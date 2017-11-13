import {
  isSymbol,
  toString,
} from 'util/lang'

import {
  isIndex,
} from './path.utils'

/**
 * Converts a value to a valid path key.<br />
 * Returns <code>arg</code> if arg is a positive integer or a Symbol, <code>toString(arg)</code> otherwise.
 * @function
 * @param {*} arg The value to convert
 * @return {string} A valid path key
 * @memberof core
 * @private
 * @since 1.0.0
 */
const toKey = arg => {
  if (isIndex(arg)) return arg
  if (isSymbol(arg)) return arg
  if (Array.isArray(arg) && arg.length === 2 && isSliceIndex(arg[0]) && isSliceIndex(arg[0])) return arg
  return toString(arg)
}

const quotes = ['"', '\'']

/**
 * Tests whether <code>index</code>th char of <code>str</code> is a quote.<br />
 * Quotes are <code>"</code> and <code>'</code>.
 * @function
 * @param {string} str The string
 * @param {number} index Index of the char to test
 * @return {{ quoted: boolean, quote: string }} A boolean <code>quoted</code>, true if <code>str.charAt(index)</code> is a quote and the <code>quote</code>.
 * @memberof core
 * @private
 * @since 1.0.0
 */
const isQuoteChar = (str, index) => {
  const char = str.charAt(index)
  const quote = quotes.find(c => c === char)
  return {
    quoted: Boolean(quote),
    quote,
  }
}

const escapedQuotesRegexps = {}
for (const quote of quotes)
  escapedQuotesRegexps[quote] = new RegExp(`\\\\${quote}`, 'g')

  /**
   * Strip slashes preceding occurences of <code>quote</code> from <code>str</code><br />
   * Possible quotes are <code>"</code> and <code>'</code>.
   * @function
   * @param {string} str The string
   * @param {string} quote The quote to unescape
   * @return {string} The unescaped string
   * @memberof core
   * @private
   * @since 1.0.0
   */
const unescapeQuotes = (str, quote) => str.replace(escapedQuotesRegexps[quote], quote)

/**
 * Converts <code>str</code> to a slice index.
 * @function
 * @param {string} str The string to convert
 * @return {number} <code>undefined</code> if <code>str</code> is empty, otherwise an int (may be NaN)
 * @memberof core
 * @private
 * @since 1.0.0
 */
const toSliceIndex = str => str === '' ? undefined : Number(str)

/**
 * Tests whether <code>arg</code> is a valid slice index, that is <code>undefined</code> or a valid int.
 * @function
 * @param {*} arg The value to test
 * @return {boolean} True if <code>arg</code> is a valid slice index, false otherwise.
 * @private
 * @since 1.0.0
 */
const isSliceIndex = arg => arg === undefined || Number.isSafeInteger(arg)

/**
 * Wraps <code>fn</code> allowing to call it with an array instead of a string.<br />
 * The returned function behaviour is :<br />
 *  - If called with an array, returns a copy of the array with values converted to path keys<br />
 *  - Otherwise, calls <code>fn</code> with the string representation of its argument
 * @function
 * @param {function} fn The function to wrap
 * @return {function} The wrapper function
 * @memberof core
 * @private
 * @since 1.0.0
 */
const allowingArrays = fn => arg => {
  if (Array.isArray(arg)) return arg.map(toKey)

  return fn(toString(arg))
}

/**
 * Converts <code>str</code> to a path represented as an array of keys.
 * @function
 * @param {string} str The string to convert
 * @return {Array<string|number|Array>} The path represented as an array of keys
 * @memberof core
 * @private
 * @since 1.0.0
 */
const stringToPath = str => {
  const path = []
  let index = 0

  while (true) { // eslint-disable-line no-constant-condition
    // Look for new dot or opening square bracket
    const nextPointIndex = str.indexOf('.', index)
    const nextBracketIndex = str.indexOf('[', index)

    // If neither one is found add the end of str to the path and stop
    if (nextPointIndex === -1 && nextBracketIndex === -1) {
      path.push(str.substring(index))
      break
    }

    let isArrayNotation = false

    // If a dot is found before an opening square bracket
    if (nextPointIndex !== -1 && (nextBracketIndex === -1 || nextPointIndex < nextBracketIndex)) {
      // Add the text preceding the dot to the path and move index after the dot
      path.push(str.substring(index, nextPointIndex))
      index = nextPointIndex + 1

      // If an opening square bracket follows the dot,
      // enable array notation and move index after the bracket
      if (nextBracketIndex === nextPointIndex + 1) {
        isArrayNotation = true
        index = nextBracketIndex + 1
      }

    // If an opening square bracket is found before a dot
    } else if (nextBracketIndex !== -1) {
      // Enable array notation
      isArrayNotation = true

      // If any text precedes the bracket, add it to the path
      if (nextBracketIndex !== index)
        path.push(str.substring(index, nextBracketIndex))

      // Move index after the bracket
      index = nextBracketIndex + 1
    }

    // If array notation is enabled
    if (isArrayNotation) {
      // Check if next character is a string quote
      const { quoted, quote } = isQuoteChar(str, index)

      // If array index is a quoted string
      if (quoted) {
        // Move index after the string quote
        index++

        // Look for the next unescaped matching string quote
        let endQuoteIndex, quotedIndex = index
        do {
          endQuoteIndex = str.indexOf(quote, quotedIndex)
          quotedIndex = endQuoteIndex + 1
        } while (endQuoteIndex !== -1 && str.charAt(endQuoteIndex - 1) === '\\')

        // If no end quote found, stop if end of str is reached, or continue to next iteration
        if (endQuoteIndex === -1) {
          if (index !== str.length) path.push(str.substring(index))
          break
        }

        // Add the content of quotes to the path, unescaping escaped quotes
        path.push(unescapeQuotes(str.substring(index, endQuoteIndex), quote))

        // Move index after end quote
        index = endQuoteIndex + 1

        // If next character is a closing square bracket, move index after it
        if (str.charAt(index) === ']') index++

        // Stop if end of str has been reached
        if (index === str.length) break

        // If next character is a dot, move index after it (skip it)
        if (str.charAt(index) === '.') index++

      } else { // If array index is not a quoted string

        // Look for the closing square bracket
        const closingBracketIndex = str.indexOf(']', index)

        // If no closing bracket found, stop if end of str is reached, or continue to next iteration
        if (closingBracketIndex === -1) {
          if (index !== str.length) path.push(str.substring(index))
          break
        }

        // Fetch the content of brackets and move index after closing bracket
        const arrayIndexValue = str.substring(index, closingBracketIndex)
        index = closingBracketIndex + 1

        // If next character is a dot, move index after it (skip it)
        if (str.charAt(index) === '.') index++

        // Shorthand: if array index is the whole slice add it to path
        if (arrayIndexValue === ':') {
          path.push([undefined, undefined])
        } else {

          // Look for a slice quote
          const sliceDelimIndex = arrayIndexValue.indexOf(':')

          // If no slice quote found
          if (sliceDelimIndex === -1) {
            // Parse array index as a number
            const nArrayIndexValue = Number(arrayIndexValue)

            // Add array index to path, either as a valid index (positive int), or as a string
            path.push(isIndex(nArrayIndexValue) ? nArrayIndexValue : arrayIndexValue)

          } else { // If a slice quote is found

            // Fetch slice start and end, and parse them as slice indexes (empty or valid int)
            const sliceStart = arrayIndexValue.substring(0, sliceDelimIndex), sliceEnd = arrayIndexValue.substring(sliceDelimIndex + 1)
            const nSliceStart = toSliceIndex(sliceStart), nSliceEnd = toSliceIndex(sliceEnd)

            // Add array index to path, as a slice if both slice indexes are valid (undefined or int), or as a string
            path.push(isSliceIndex(nSliceStart) && isSliceIndex(nSliceEnd) ? [nSliceStart, nSliceEnd] : arrayIndexValue)
          }
        }

        // Stop if end of string has been reached
        if (index === str.length) break
      }
    }

  }

  return path
}

const MAX_CACHE_SIZE = 1000
const cache = new Map()

/**
 * Memoized version of {@link core.stringToPath}.<br />
 * The cache has a maximum size of 1000, when overflowing the cache is cleared.
 * @function
 * @param {string} str The string to convert
 * @return {Array<string|number|Array>} The path represented as an array of keys
 * @memberof core
 * @private
 * @since 1.0.0
 */
const memoizedStringToPath = str => {
  if (cache.has(str)) return cache.get(str)

  const path = stringToPath(str)

  if (cache.size === MAX_CACHE_SIZE) cache.clear()
  cache.set(str, path)

  return path
}

/**
 * Converts <code>arg</code> to a path represented as an array of keys.<br />
 * <code>arg</code> may be a string, in which case it will be parsed.<br />
 * It may also be an Array, in which case a copy of the array with values converted to path keys will be returned.<br />
 * If <code>arg</code> is neither a string nor an Array, its string representation will be parsed.<br />
 * This function is failsafe, it will never throw an error.
 * @function
 * @param {string|Array|*} arg The value to convert
 * @return {Array<string|number|Array>} The path represented as an array of keys
 * @memberof core
 * @since 1.0.0
 * @example toPath('a.b[1]["."][1:-1]') // => ['a', 'b', 1, '.', [1, -1]]
 */
const toPath = allowingArrays(arg => [...memoizedStringToPath(arg)])

/**
 * This method is like {@link core.toPath} except it returns memoized arrays which must not be mutated.
 * @function
 * @param {string|Array|*} arg The value to convert
 * @return {Array<string|number|Array>} The path represented as an array of keys
 * @memberof core
 * @since 1.0.0
 * @private
 */
const unsafeToPath = allowingArrays(memoizedStringToPath)

export { toPath, unsafeToPath }
