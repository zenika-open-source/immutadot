import { isSymbol } from 'util/isSymbol'
import { toString } from 'util/toString'

const isIndex = arg => Number.isSafeInteger(arg) && arg >= 0

const toKey = arg => isIndex(arg) || isSymbol(arg) ? arg : toString(arg)

const delimiterChars = ['"', '\'']
const isDelimiterChar = (str, index) => {
  const char = str.charAt(index)
  const delimiterChar = delimiterChars.find(c => c === char)
  return {
    delimited: Boolean(delimiterChar),
    delimiterChar,
  }
}

const toSliceIndex = str => str === '' ? undefined : Number.parseInt(str)

const toPath = arg => {
  if (Array.isArray(arg)) return arg.map(toKey)

  const str = toString(arg)

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
      const { delimited, delimiterChar } = isDelimiterChar(str, index)
      if (delimited) {
        // TODO
      } else {
        const closingBracket = str.indexOf(']', index)
        if (closingBracket === -1) {
          path.push(str.substring(index))
          break
        }
        const arrayIndex = str.substring(index, closingBracket)
        index = closingBracket + 1
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

export { toPath }
