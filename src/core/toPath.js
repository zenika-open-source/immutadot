import {
  isSymbol,
  toString,
} from 'util/lang'

const isIndex = arg => Number.isSafeInteger(arg) && arg >= 0

const toKey = arg => isIndex(arg) || isSymbol(arg) ? arg : toString(arg)

const delimiters = ['"', '\'']
const isDelimiterChar = (str, index) => {
  const char = str.charAt(index)
  const delimiter = delimiters.find(c => c === char)
  return {
    delimited: Boolean(delimiter),
    delimiter,
  }
}

const toSliceIndex = str => str === '' ? undefined : Number.parseInt(str)

const escapedDelimsRegexps = {}
for (const delimiter of delimiters)
  escapedDelimsRegexps[delimiter] = new RegExp(`\\\\${delimiter}`, 'g')

const unescapeDelimiters = (str, delimiter) => str.replace(escapedDelimsRegexps[delimiter], delimiter)

const allowingArrays = fn => arg => {
  if (Array.isArray(arg)) return arg.map(toKey)

  return fn(toString(arg))
}

const stringToPath = str => {
  const path = []
  let index = 0
  let arrayNotation = false

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const nextPoint = str.indexOf('.', index)
    const nextBracket = str.indexOf('[', index)

    if (nextPoint === -1 && nextBracket === -1) {
      path.push(str.substring(index))
      break
    }

    if (nextPoint !== -1 && (nextBracket === -1 || nextPoint < nextBracket)) {
      path.push(str.substring(index, nextPoint))
      index = nextPoint + 1
      if (nextBracket === nextPoint + 1) {
        arrayNotation = true
        index = nextBracket + 1
      }
    } else if (nextBracket !== -1) {
      arrayNotation = true
      if (nextBracket !== index)
        path.push(str.substring(index, nextBracket))
      index = nextBracket + 1
    }

    if (arrayNotation) {
      const { delimited, delimiter } = isDelimiterChar(str, index)
      if (delimited) {
        index++
        let endDelimiter, escapedIndex = index
        do {
          endDelimiter = str.indexOf(delimiter, escapedIndex)
          escapedIndex = endDelimiter + 1
        } while (endDelimiter !== -1 && str.charAt(endDelimiter - 1) === '\\')
        if (endDelimiter === -1) {
          path.push(unescapeDelimiters(str.substring(index), delimiter))
          break
        }
        path.push(unescapeDelimiters(str.substring(index, endDelimiter), delimiter))
        index = endDelimiter + 1
        if (str.charAt(index) === ']') index++
        if (index === str.length) break
        if (str.charAt(index) === '.') index++
      } else {
        const closingBracket = str.indexOf(']', index)
        if (closingBracket === -1) {
          path.push(str.substring(index))
          break
        }
        const arrayIndex = str.substring(index, closingBracket)
        index = closingBracket + 1
        if (str.charAt(index) === '.') index++
        if (arrayIndex === ':')
          path.push([undefined, undefined])
        else {
          const sliceDelimIndex = arrayIndex.indexOf(':')
          if (sliceDelimIndex === -1) {
            const nArrayIndex = Number.parseInt(arrayIndex)
            path.push(Number.isNaN(nArrayIndex) ? arrayIndex : nArrayIndex)
          } else {
            const sliceStart = arrayIndex.substring(0, sliceDelimIndex), sliceEnd = arrayIndex.substring(sliceDelimIndex + 1)
            const nSliceStart = toSliceIndex(sliceStart), nSliceEnd = toSliceIndex(sliceEnd)
            path.push(Number.isNaN(nSliceStart) || Number.isNaN(nSliceEnd) ? arrayIndex : [nSliceStart, nSliceEnd])
          }
        }
        if (index === str.length) break
      }
    }

  }

  return path
}

const MAX_CACHE_SIZE = 1000
const cache = new Map()
const memoizedStringToPath = str => {
  if (cache.has(str)) return cache.get(str)

  const path = stringToPath(str)

  if (cache.size === MAX_CACHE_SIZE) cache.clear()
  cache.set(str, path)

  return path
}

const toPath = allowingArrays(str => [...memoizedStringToPath(str)])

const unsafeToPath = allowingArrays(memoizedStringToPath)

export { toPath, unsafeToPath }
