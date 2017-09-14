import {
  isIndex,
  isSymbol,
  toString,
} from 'util/lang'

/**
 * Converts a value to a valid path key.<br />
 * Returns <code>arg</code> if arg is a positive integer or a Symbol, <code>toString(arg)</code> otherwise.
 * @param {*} arg The value to convert
 * @return {string} A valid path key
 * @memberof core
 * @private
 * @since 0.4.0
 */
const toKey = arg => {
  if (isIndex(arg)) return arg
  if (isSymbol(arg)) return arg
  if (Array.isArray(arg) && arg.length === 2 && isSliceIndex(arg[0]) && isSliceIndex(arg[0])) return arg
  return toString(arg)
}

const delimiters = ['"', '\'']

/**
 * Tests whether <code>index</code>th char of <code>str</code> is a delimiter.<br />
 * Delimiters are <code>"</code> and <code>'</code>.
 * @param {string} str The string
 * @param {number} index Index of the char to test
 * @return {{ delimited: boolean, delimiter: string }} A boolean <code>delimited</code>, true if <code>str.charAt(index)</code> is a delimiter and the <code>delimiter</code>.
 * @memberof core
 * @private
 * @since 0.4.0
 */
const isDelimiterChar = (str, index) => {
  const char = str.charAt(index)
  const delimiter = delimiters.find(c => c === char)
  return {
    delimited: Boolean(delimiter),
    delimiter,
  }
}

const escapedDelimsRegexps = {}
for (const delimiter of delimiters)
  escapedDelimsRegexps[delimiter] = new RegExp(`\\\\${delimiter}`, 'g')

  /**
   * Strip slashes preceding occurences of <code>delimiter</code> from <code>str</code><br />
   * Possible delimiters are <code>"</code> and <code>'</code>.
   * @param {string} str The string
   * @param {string} delimiter The delimiter to unescape
   * @return {string} The unescaped string
   * @memberof core
   * @private
   * @since 0.4.0
   */
const unescapeDelimiters = (str, delimiter) => str.replace(escapedDelimsRegexps[delimiter], delimiter)

/**
 * Converts <code>str</code> to a slice index.
 * @param {string} str The string to convert
 * @return {number} <code>undefined</code> if <code>str</code> is empty, otherwise an int (may be NaN)
 * @memberof core
 * @private
 * @since 0.4.0
 */
const toSliceIndex = str => str === '' ? undefined : Number(str)

/**
 * Tests whether <code>arg</code> is a valid slice index, that is <code>undefined</code> or a valid int.
 * @param {*} arg The value to test
 * @return {boolean} True if <code>arg</code> is a valid slice index, false otherwise.
 * @private
 * @since 0.4.0
 */
const isSliceIndex = arg => arg === undefined || Number.isSafeInteger(arg)

/**
 * Wraps <code>fn</code> allowing to call it with an array instead of a string.<br />
 * The returned function behaviour is :<br />
 *  - If called with an array, returns a copy of the array with values converted to path keys<br />
 *  - Otherwise, calls <code>fn</code> with the string representation of its argument
 * @param {function} fn The function to wrap
 * @return {function} The wrapper function
 * @memberof core
 * @private
 * @since 0.4.0
 */
const allowingArrays = fn => arg => {
  if (Array.isArray(arg)) return arg.map(toKey)

  return fn(toString(arg))
}

/**
 * Converts <code>str</code> to a path represented as an array of keys.
 * @param {string} str The string to convert
 * @return {(string|number)[]} The path represented as an array of keys
 * @memberof core
 * @private
 * @since 0.4.0
 */
const stringToPath = str => {
  const path = []
  let index = 0

  while (true) { // eslint-disable-line no-constant-condition
    // Look for new dot or opening square bracket
    const nextPoint = str.indexOf('.', index)
    const nextBracket = str.indexOf('[', index)

    // If neither one is found add the end of str to the path and stop
    if (nextPoint === -1 && nextBracket === -1) {
      path.push(str.substring(index))
      break
    }

    let arrayNotation = false

    // If a dot is found before an opening square bracket
    if (nextPoint !== -1 && (nextBracket === -1 || nextPoint < nextBracket)) {
      // Add the text preceding the dot to the path and move index after the dot
      path.push(str.substring(index, nextPoint))
      index = nextPoint + 1

      // If an opening square bracket follows the dot,
      // enable array notation and move index after the bracket
      if (nextBracket === nextPoint + 1) {
        arrayNotation = true
        index = nextBracket + 1
      }

    // If an opening square bracket is found before a dot
    } else if (nextBracket !== -1) {
      // Enable array notation
      arrayNotation = true

      // If any text precedes the bracket, add it to the path
      if (nextBracket !== index)
        path.push(str.substring(index, nextBracket))

      // Move index after the bracket
      index = nextBracket + 1
    }

    // If array notation is enabled
    if (arrayNotation) {
      // Check if next character is a string delimiter
      const { delimited, delimiter } = isDelimiterChar(str, index)

      // If array index is a delimited string
      if (delimited) {
        // Move index after the string delimiter
        index++

        // Look for the next unescaped matching string delimiter
        let endDelimiter, escapedIndex = index
        do {
          endDelimiter = str.indexOf(delimiter, escapedIndex)
          escapedIndex = endDelimiter + 1
        } while (endDelimiter !== -1 && str.charAt(endDelimiter - 1) === '\\')

        // If no end delimiter found, stop if end of str is reached, or continue to next iteration
        if (endDelimiter === -1)
          if (index === str.length)
            break
          else
            continue

        // Add the content of delimiters to the path, unescaping escaped delimiters
        path.push(unescapeDelimiters(str.substring(index, endDelimiter), delimiter))

        // Move index after end delimiter
        index = endDelimiter + 1

        // If next character is a closing square bracket, move index after it
        if (str.charAt(index) === ']') index++

        // Stop if end of str has been reached
        if (index === str.length) break

        // If next character is a dot, move index after it (skip it)
        if (str.charAt(index) === '.') index++

      } else { // If array index is not a delimited string

        // Look for the closing square bracket
        const closingBracket = str.indexOf(']', index)

        // If no closing bracket found, stop if end of str is reached, or continue to next iteration
        if (closingBracket === -1)
          if (index === str.length)
            break
          else
            continue

        // Fetch the content of brackets and move index after closing bracket
        const arrayIndex = str.substring(index, closingBracket)
        index = closingBracket + 1

        // If next character is a dot, move index after it (skip it)
        if (str.charAt(index) === '.') index++

        // Shorthand: if array index is the whole slice add it to path
        if (arrayIndex === ':')
          path.push([undefined, undefined])

        else { // Otherwise

          // Look for a slice delimiter
          const sliceDelimIndex = arrayIndex.indexOf(':')

          // If no slice delimiter found
          if (sliceDelimIndex === -1) {
            // Parse array index as a number
            const nArrayIndex = Number(arrayIndex)

            // Add array index to path, either as a valid index (positive int), or as a string
            path.push(isIndex(nArrayIndex) ? nArrayIndex : arrayIndex)

          } else { // If a slice delimiter is found

            // Fetch slice start and end, and parse them as slice indexes (empty or valid int)
            const sliceStart = arrayIndex.substring(0, sliceDelimIndex), sliceEnd = arrayIndex.substring(sliceDelimIndex + 1)
            const nSliceStart = toSliceIndex(sliceStart), nSliceEnd = toSliceIndex(sliceEnd)

            // Add array index to path, as a slice if both slice indexes are valid (undefined or int), or as a string
            path.push(isSliceIndex(nSliceStart) && isSliceIndex(nSliceEnd) ? [nSliceStart, nSliceEnd] : arrayIndex)
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
 * @param {string} str The string to convert
 * @return {(string|number)[]} The path represented as an array of keys
 * @memberof core
 * @private
 * @since 0.4.0
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
 * @param {string|Array|*} arg The value to convert
 * @return {(string|number)[]} The path represented as an array of keys
 * @memberof core
 * @since 0.4.0
 * @example toPath('a.b[1]["."][1:-1]') // => ['a', 'b', 1, '.', [1, -1]]
 */
const toPath = allowingArrays(arg => [...memoizedStringToPath(arg)])

/**
 * This method is like {@link core.toPath} except it returns memoized arrays which must not be mutated.
 * @param {string|Array|*} arg The value to convert
 * @return {(string|number)[]} The path represented as an array of keys
 * @memberof core
 * @since 0.4.0
 * @private
 */
const unsafeToPath = allowingArrays(memoizedStringToPath)

export { toPath, unsafeToPath }
