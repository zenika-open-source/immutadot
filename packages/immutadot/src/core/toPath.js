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
  const path = stringToPath2(str)
  return str[0] === '.' ? ['', ...path] : path
}

const splitAtFirstOccurence = (str, separators) => {
  const partitionIndex = separators
    .map(separator => str.indexOf(separator))
    .map(index => index >= 0 ? index : str.length)
    .reduce((minIndex, index) => Math.min(minIndex, index))
  return [str.substring(0, partitionIndex), str.substr(partitionIndex, 1), str.substring(partitionIndex + 1)]
}

/**
 * 
 * @param {string} str string to parse, expected to start with an opening square bracket followed by a quote char
 * @param {*} quote the quote char
 * @returns {[string, string]} a tuple of the dequoted path segment and the rest of the input string
 * @example parseQuotedBracketNotation('["abc"].def', '"') // ['abc', 'def']
 * @example parseQuotedBracketNotation('["abc', '"') // ['abc', '']
 * @example parseQuotedBracketNotation('abc', '"') // ['c', '']
 * @example parseQuotedBracketNotation('ab', '"') // [undefined, '']
 */
const parseQuotedBracketNotation = (str, quote) => {
  const [match, pathSegment, remainingStr] = str.match(new RegExp(`^\\[${quote}(.*?[^\\\\])${quote}\\]?\\.?(.*)$`)) || []
  if (!match)
    return [str.substring(2) || undefined, '']
  return [unescapeQuotes(pathSegment, quote), remainingStr]
}

const parseBareBracketNotation = str => {
  // Look for the closing square bracket
  const closingBracket = str.indexOf(']')

  // If no closing bracket found, stop if end of str is reached, or continue to next iteration
  if (closingBracket === -1)
    return str.length > 1 ? [str.substring(1), ''] : [undefined, '']

    // Fetch the content of brackets and move index after closing bracket
  const arrayIndex = str.substring(1, closingBracket)

  let index = closingBracket + 1

  // If next character is a dot, move index after it (skip it)
  if (str.charAt(index) === '.') index++

  // Shorthand: if array index is the whole slice add it to path
  if (arrayIndex === ':')
    return [[undefined, undefined], str.substring(index)]

  // Look for a slice delimiter
  const sliceDelimIndex = arrayIndex.indexOf(':')

  // If no slice delimiter found
  if (sliceDelimIndex === -1) {
    // Parse array index as a number
    const nArrayIndex = Number(arrayIndex)

    // Add array index to path, either as a valid index (positive int), or as a string
    return [isIndex(nArrayIndex) ? nArrayIndex : arrayIndex, str.substring(index)]

  } // If a slice delimiter is found

  // Fetch slice start and end, and parse them as slice indexes (empty or valid int)
  const sliceStart = arrayIndex.substring(0, sliceDelimIndex), sliceEnd = arrayIndex.substring(sliceDelimIndex + 1)
  const nSliceStart = toSliceIndex(sliceStart), nSliceEnd = toSliceIndex(sliceEnd)

  // Add array index to path, as a slice if both slice indexes are valid (undefined or int), or as a string
  return [isSliceIndex(nSliceStart) && isSliceIndex(nSliceEnd) ? [nSliceStart, nSliceEnd] : arrayIndex, str.substring(index)]
}

const parseBracketNotation = str => {
  const { quoted, quote } = isQuoteChar(str, 1)
  if (quoted)
    return parseQuotedBracketNotation(str, quote)
  return parseBareBracketNotation(str)
}

const stringToPath2 = str => {
  if (str.length === 0)
    return []
  if (str[0] === '[') {
    const [bracketedPathSegment, rest] = parseBracketNotation(str)
    const restOfPath = stringToPath2(rest)
    return bracketedPathSegment !== undefined
      ? [bracketedPathSegment, ...restOfPath]
      : [...restOfPath]
  }
  const [beforeSeparator, separator, afterSeparator] = splitAtFirstOccurence(str, ['.', '['])
  return separator === '.'
    ? [beforeSeparator, ...stringToPath2(afterSeparator)]
    : [beforeSeparator, ...stringToPath2(separator + afterSeparator)]
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
