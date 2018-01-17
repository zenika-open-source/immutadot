import {
  allProps,
  index,
  list,
  prop,
  slice,
} from './consts'

import {
  filter,
  map,
  race,
  regexp,
} from './parser.utils'

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

const emptyStringParser = str => str.length === 0 ? [] : null

const quotedBracketNotationParser = map(
  regexp(/^\[(['"])(.*?[^\\])\1\]?\.?(.*)$/),
  ([quote, property, rest]) => [[prop, unescapeQuotes(property, quote)], ...applyParsers(rest)],
)

const incompleteQuotedBracketNotationParser = map(
  regexp(/^(\[["'][^.[{]*)\.?(.*)$/),
  ([beforeNewSegment, rest]) => [[prop, beforeNewSegment], ...applyParsers(rest)],
)

const bareBracketNotationParser = map(
  regexp(/^\[([^\]]*)\]\.?(.*)$/),
  ([property, rest]) => {
    return isIndex(Number(property))
      ? [[index, Number(property)], ...applyParsers(rest)]
      : [[prop, property], ...applyParsers(rest)]
  },
)

const incompleteBareBracketNotationParser = map(
  regexp(/^(\[[^.[{]*)\.?(.*)$/),
  ([beforeNewSegment, rest]) => [[prop, beforeNewSegment], ...applyParsers(rest)],
)

const sliceNotationParser = map(
  filter(
    regexp(/^\[([^:\]]*):([^:\]]*)\]\.?(.*)$/),
    ([sliceStart, sliceEnd]) => isSliceIndexString(sliceStart) && isSliceIndexString(sliceEnd),
  ),
  ([sliceStart, sliceEnd, rest]) => [[slice, [toSliceIndex(sliceStart, 0), toSliceIndex(sliceEnd)]], ...applyParsers(rest)],
)

const listWildCardParser = map(
  regexp(/^{\*}\.?(.*)$/),
  ([rest]) => [[allProps], ...applyParsers(rest)],
)

const listPropRegexp = /^,?((?!["'])([^,]*)|(["'])(.*?[^\\])\3)(.*)/
function* extractListProps(rawProps) {
  if (rawProps.startsWith(',')) yield ''
  let remProps = rawProps
  while (remProps !== '') {
    const [, , bareProp, , quotedProp, rest] = listPropRegexp.exec(remProps)
    yield bareProp === undefined ? quotedProp : bareProp
    remProps = rest
  }
}

const listNotationParser = map(
  regexp(/^\{(((?!["'])[^,}]*|(["']).*?[^\\]\2)(,((?!["'])[^,}]*|(["']).*?[^\\]\6))*)\}\.?(.*)$/),
  ([rawProps, , , , , , rest]) => {
    const props = [...extractListProps(rawProps)]
    return props.length === 1 ? [[prop, props[0]], ...applyParsers(rest)] : [[list, props], ...applyParsers(rest)]
  },
)

const incompleteListNotationParser = map(
  regexp(/^(\{[^.[{]*)\.?(.*)$/),
  ([beforeNewSegment, rest]) => [[prop, beforeNewSegment], ...applyParsers(rest)],
)

const pathSegmentEndedByNewSegment = map(
  regexp(/^([^.[{]*)\.?([[{]?.*)$/),
  ([beforeNewSegment, rest]) => [[prop, beforeNewSegment], ...applyParsers(rest)],
)

const applyParsers = race([
  emptyStringParser,
  quotedBracketNotationParser,
  incompleteQuotedBracketNotationParser,
  sliceNotationParser,
  bareBracketNotationParser,
  incompleteBareBracketNotationParser,
  listWildCardParser,
  listNotationParser,
  incompleteListNotationParser,
  pathSegmentEndedByNewSegment,
])

const MAX_CACHE_SIZE = 1000
const cache = new Map()

const stringToPath = pStr => {
  const str = pStr.startsWith('.') ? pStr.substring(1) : pStr

  const path = applyParsers(str)

  return pStr.endsWith('.') ? [...path, [prop, '']] : path
}

/**
 * Memoized version of {@link path.stringToPath}.<br />
 * The cache has a maximum size of 1000, when overflowing the cache is cleared.
 * @function
 * @param {string} str The string to convert
 * @returns {Array<Array<Symbol,*>>} The path represented as an array of keys
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
 * @returns {Array<Array<Symbol,*>>} The path represented as an array of keys
 * @memberof path
 * @since 1.0.0
 * @example toPath('a.b[1]["."][1:-1]') // => [[prop, 'a'], [prop, 'b'], [index, 1], [prop, '.'], [slice, [1, -1]]]
 * @private
 */
const toPath = arg => {
  if (isNil(arg)) return []

  return memoizedStringToPath(toString(arg))
}

export { toPath }
