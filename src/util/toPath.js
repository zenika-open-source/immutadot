import { isSymbol } from 'util/isSymbol'
import { toString } from 'util/toString'

const isIndex = arg => Number.isSafeInteger(arg) && arg >= 0

const toKey = arg => isIndex(arg) || isSymbol(arg) ? arg : toString(arg)

const toPath = arg => {
  if (Array.isArray(arg)) return arg.map(toKey)

  if (isIndex(arg)) return [arg]

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
      // TODO
    }
  }

  return path
}

export { toPath }
