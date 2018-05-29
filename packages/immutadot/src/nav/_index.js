import { NONE } from './consts'
import { isNil } from 'util/lang'

function makeCopy(obj) {
  if (isNil(obj)) return []
  return Array.isArray()
}

export function index(key) {
  return next => obj => (updater = NONE) => {
    const nextValue = isNil(obj) ? next(undefined) : next(obj[key])

    if (updater === NONE) return nextValue()

    const copy = makeCopy(obj)
    copy[key] = nextValue(updater)
    return copy
  }
}
