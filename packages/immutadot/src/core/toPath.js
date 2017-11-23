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
 * Tests whether <code>arg</code> is a valid slice index once converted to a number.
 * @param {*} arg The value to test
 * @return {boolean} True if <code>arg</code> is a valid slice index once converted to a number, false otherwise.
 * @private
 */
const isSliceIndexString = arg => isSliceIndex(arg ? Number(arg) : undefined)

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
 * @typedef {function(string): string[]} Matcher a function that can replace String.prototype.match
 * @param {string} str string to match against
 * @param {[(Matcher | RegExp), function(string[]): *]} matchers
 *   pairs of a regexp to match str against, and a function to transform the resulting match object into the final result
 * @param {*} defaultResult
 *   value to return if no matcher matches
 * @returns {*} output value of the first cond that matches or defaultResult if no cond matches
 */
const match = (str, matchers, defaultResult) => {
  for (const [matcher, mapper] of matchers) {
    const matchResult = matcher instanceof RegExp ? str.match(matcher) : matcher(str)
    if (matchResult) return mapper(...matchResult.slice(1))
  }
  return defaultResult
}

match.andCheck = (matcher, predicate) => {
  return str => {
    const matchResult = str.match(sliceNotation)
    if (!matchResult) return matchResult
    return predicate(...matchResult.slice(1)) ? matchResult : null
  }
}

const quotedBracketNotation = /^\[(['"])(.*?[^\\])\1\]?\.?(.*)$/
const incompleteQuotedBracketNotation = /^\[["'](.*)$/
const sliceNotation = /^\[([^:\]]*):([^:\]]*)\]\.?(.*)$/
const bareBracketNotation = /^\[([^\]]*)\]\.?(.*)$/
const incompleteBareBracketNotation = /^\[(.*)$/
const pathSegmentEndedByDot = /^([^.[]*?)\.(.*)$/
const pathSegmentEndedByBracket = /^([^.[]*?)(\[.*)$/

/**
 * Converts <code>str</code> to a path represented as an array of keys.
 * @param {string} str The string to convert
 * @return {(string|number)[]} The path represented as an array of keys
 * @memberof core
 * @private
 * @since 0.4.0
 */
const stringToPath = str => {
  return match(str, [
    [
      str => str.length === 0 ? [] : null,
      () => [],
    ],
    [
      quotedBracketNotation,
      (quote, property, rest) => [unescapeQuotes(property, quote), ...stringToPath(rest)],
    ],
    [
      incompleteQuotedBracketNotation,
      (rest) => rest ? [rest] : [],
    ],
    [
      match.andCheck(
        sliceNotation,
        (sliceStart, sliceEnd) => isSliceIndexString(sliceStart) && isSliceIndexString(sliceEnd),
      ),
      (sliceStart, sliceEnd, rest) => [[toSliceIndex(sliceStart), toSliceIndex(sliceEnd)], ...stringToPath(rest)],
    ],
    [
      bareBracketNotation,
      (property, rest) =>
        isIndex(Number(property))
          ? [Number(property), ...stringToPath(rest)]
          : [property, ...stringToPath(rest)],
    ],
    [
      incompleteBareBracketNotation,
      (rest) => rest ? [rest] : [],
    ],
    [
      pathSegmentEndedByDot,
      (beforeDot, afterDot) => [beforeDot, ...stringToPath(afterDot)],
    ],
    [
      pathSegmentEndedByBracket,
      (beforeBracket, atBracket) => [beforeBracket, ...stringToPath(atBracket)],
    ],
  ], [str])
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
