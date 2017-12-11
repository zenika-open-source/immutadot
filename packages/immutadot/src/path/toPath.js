import {
  filter,
  map,
  race,
  regexp,
} from './parser.utils'

import {
  index,
  list,
  prop,
  slice,
} from './consts'

import {
  isIndex,
  isSliceIndex,
} from './utils'

import {
  isNil,
  toString,
} from 'util/lang'

/**
 * Strip slashes preceding occurences of <code>quote</code> from <code>str</code><br />
 * Possible quotes are <code>"</code> and <code>'</code>.
 * @function
 * @param {string} str The string
 * @param {string} quote The quote to unescape
 * @returns {string} The unescaped string
 * @memberof path
 * @private
 * @since 1.0.0
 */
const unescapeQuotes = (str, quote) => str.replace(new RegExp(`\\\\${quote}`, 'g'), quote)

/**
 * Converts <code>str</code> to a slice index.
 * @function
 * @param {string} str The string to convert
 * @param {number?} defaultValue The default value if <code>str</code> is empty
 * @returns {number} <code>undefined</code> if <code>str</code> is empty, otherwise an int (may be NaN)
 * @memberof path
 * @private
 * @since 1.0.0
 */
const toSliceIndex = (str, defaultValue) => str === '' ? defaultValue : Number(str)

/**
 * Tests whether <code>arg</code> is a valid slice index once converted to a number.
 * @function
 * @memberof path
 * @param {*} arg The value to test
 * @returns {boolean} True if <code>arg</code> is a valid slice index once converted to a number, false otherwise.
 * @private
 * @since 1.0.0
 */
const isSliceIndexString = arg => isSliceIndex(arg ? Number(arg) : undefined)

/**
 * Wraps <code>fn</code> allowing to call it with an array instead of a string.<br />
 * The returned function behaviour is :<br />
 *  - If called with an array, returns a copy of the array with values converted to path keys<br />
 *  - Otherwise, calls <code>fn</code> with the string representation of its argument
 * @function
 * @param {function} fn The function to wrap
 * @returns {function} The wrapper function
 * @memberof path
 * @private
 * @since 1.0.0
 */
const allowingArrays = fn => arg => {
  if (Array.isArray(arg)) return arg
  return fn(arg)
}

const emptyStringParser = str => str.length === 0 ? [] : null

const quotedBracketNotationParser = map(
  regexp(/^\[(['"])(.*?[^\\])\1\]?\.?(.*)$/),
  ([quote, property, rest]) => [[prop, unescapeQuotes(property, quote)], ...stringToPath(rest)],
)

const incompleteQuotedBracketNotationParser = map(
  regexp(/^\[["'](.*)$/),
  ([rest]) => rest ? [[prop, rest]] : [],
)

const bareBracketNotationParser = map(
  regexp(/^\[([^\]]*)\]\.?(.*)$/),
  ([property, rest]) => {
    return isIndex(Number(property))
      ? [[index, Number(property)], ...stringToPath(rest)]
      : [[prop, property], ...stringToPath(rest)]
  },
)

const incompleteBareBracketNotationParser = map(
  regexp(/^\[(.*)$/),
  ([rest]) => rest ? [[prop, rest]] : [],
)

const sliceNotationParser = map(
  filter(
    regexp(/^\[([^:\]]*):([^:\]]*)\]\.?(.*)$/),
    ([sliceStart, sliceEnd]) => isSliceIndexString(sliceStart) && isSliceIndexString(sliceEnd),
  ),
  ([sliceStart, sliceEnd, rest]) => [[slice, [toSliceIndex(sliceStart, 0), toSliceIndex(sliceEnd)]], ...stringToPath(rest)],
)

const listPropRegexp = /^,?((?!["'])([^,]*)|(["'])(.*?[^\\])\3)(.*)/
const listNotationParser = map(
  regexp(/^\{(((?!["'])[^,}]*|(["']).*?[^\\]\2)(,((?!["'])[^,}]*|(["']).*?[^\\]\6))*)\}\.?(.*)$/),
  ([rawProps, , , , , , rest]) => {
    const props = []
    if (rawProps.startsWith(',')) props.push('')
    for (let propMatch = rawProps.match(listPropRegexp); propMatch !== undefined; propMatch = propMatch[5] === '' ? undefined : propMatch[5].match(listPropRegexp))
      props.push(propMatch[2] === undefined ? propMatch[4] : propMatch[2])
    return props.length === 1 ? [[prop, props[0]], ...stringToPath(rest)] : [[list, props], ...stringToPath(rest)]
  },
)

const incompleteListNotationParser = map(
  regexp(/^(\{[^.[{]*)(.*)$/),
  ([beforeNewSegment, rest]) => {
    return [[prop, beforeNewSegment], ...stringToPath(rest)]
  },
)

const pathSegmentEndedByNewSegment = map(
  regexp(/^([^.[{]*)\.?([[{]?.*)$/),
  ([beforeNewSegment, rest]) => [[prop, beforeNewSegment], ...stringToPath(rest)],
)

const applyParsers = race([
  emptyStringParser,
  quotedBracketNotationParser,
  incompleteQuotedBracketNotationParser,
  sliceNotationParser,
  bareBracketNotationParser,
  incompleteBareBracketNotationParser,
  listNotationParser,
  incompleteListNotationParser,
  pathSegmentEndedByNewSegment,
])

/**
 * Converts <code>arg</code> to a path represented as an array of keys.
 * @function
 * @param {*} arg The value to convert
 * @returns {Array<string|number|Array>} The path represented as an array of keys
 * @memberof path
 * @private
 * @since 1.0.0
 */
const stringToPath = arg => {
  if (isNil(arg)) return []
  return applyParsers(toString(arg))
}

const MAX_CACHE_SIZE = 1000
const cache = new Map()

/**
 * Memoized version of {@link core.stringToPath}.<br />
 * The cache has a maximum size of 1000, when overflowing the cache is cleared.
 * @function
 * @param {string} str The string to convert
 * @returns {Array<string|number|Array>} The path represented as an array of keys
 * @memberof path
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
 * If <code>arg</code> is neither a string nor an Array, its string representation will be parsed.
 * @function
 * @param {string|Array|*} arg The value to convert
 * @returns {Array<Array<Symbol,...*>>} The path represented as an array of keys
 * @memberof path
 * @since 1.0.0
 * @example toPath('a.b[1]["."][1:-1]') // => [[prop, 'a'], [prop, 'b'], [index, 1], [prop, '.'], [slice, [1, -1]]]
 */
const toPath = allowingArrays(arg => [...memoizedStringToPath(arg)])

/**
 * This method is like {@link core.toPath} except it returns memoized arrays which must not be mutated.
 * @function
 * @param {string|Array|*} arg The value to convert
 * @returns {Array<Array<Symbol,...*>>} The path represented as an array of keys
 * @memberof path
 * @since 1.0.0
 * @private
 */
const unsafeToPath = allowingArrays(memoizedStringToPath)

export { toPath, unsafeToPath }
