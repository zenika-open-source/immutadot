import { isNil, length } from 'util/lang'
import { NONE } from './consts'

function makeCopy(obj) {
  if (isNil(obj)) return []
  return Array.isArray(obj) ? [...obj] : { ...obj }
}

export function index(key) {
  return next => obj => {
    const nextValue = isNil(obj) ? next(undefined) : next(obj[key])

    return (updater = NONE) => {
      if (updater === NONE) return nextValue()

      const copy = makeCopy(obj)
      copy[key] = nextValue(updater)
      return copy
    }
  }
}

function getSliceBound(value, length) {
  if (value < 0) return Math.max(length + value, 0)
  return value
}

function getSliceBounds([start, end], length) {
  return [
    getSliceBound(start, length),
    getSliceBound(end === undefined ? length : end, length),
  ]
}

export function slice(bounds) {
  return next => obj => {
    let nextValue

    if (isNil(obj)) {
      nextValue = () => []
    } else {
      const [start, end] = getSliceBounds(bounds, length(obj))

      const nextValues = Array.from(function* () {
        for (let i = start; i < end; i++) yield [i, next(obj[i])]
      }())

      nextValue = updater => nextValues.map(([i, nextIndex]) => [i, nextIndex(updater)])
    }

    return (updater = NONE) => {
      if (updater === NONE) return nextValue().map(([, value]) => value)

      const copy = makeCopy(obj)
      for (const [i, value] of nextValue(updater)) copy[i] = value
      return copy
    }
  }
}
