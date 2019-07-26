import { length as getLength, isNil } from 'util/lang'
import { makeNav } from './makeNav'
import { onCopy } from './arrayNav'

const resolveIndex = (index, length) => index >= 0 ? index : Math.max(length + index, 0)

const resolveStart = (pStart, length, step) => {
  if (length === 0) return 0
  if (pStart === undefined) return step > 0 ? 0 : length - 1
  return resolveIndex(pStart, length)
}

const resolveEnd = (pEnd, length, step) => {
  if (length === 0) return 0
  if (pEnd === undefined) return step > 0 ? length : -1
  return resolveIndex(pEnd, length)
}

const update = ([pStart, pEnd, pStep], next) => updater => {
  const nextUpdater = next(updater)
  const step = pStep === undefined ? 1 : pStep
  return onCopy((newValue, value) => {
    const length = getLength(value)
    const start = resolveStart(pStart, length, step)
    const end = resolveEnd(pEnd, length, step)
    if (step > 0) {
      if (end <= start) return // TODO avoid useless copy
      if (isNil(value))
        for (let i = start; i < end; i += step) newValue[i] = nextUpdater(undefined)
      else
        for (let i = start; i < end; i += step) newValue[i] = nextUpdater(value[i])
    }
    if (end >= start) return // TODO avoid useless copy
    if (isNil(value))
      for (let i = start; i > end; i += step) newValue[i] = nextUpdater(undefined)
    else
      for (let i = start; i > end; i += step) newValue[i] = nextUpdater(value[i])
  }, true)
}

const get = ([pStart, pEnd, pStep], next) => () => {
  const nextGetter = next()
  const step = pStep === undefined ? 1 : pStep
  return value => {
    const length = getLength(value)
    const start = resolveStart(pStart, length, step)
    const end = resolveEnd(pEnd, length, step)
    if (isNil(value)) return []
    let range
    if (step > 0) {
      if (end <= start) return []
      range = (function* () {
        for (let i = start; i < end; i += step) yield i
      }())
    } else {
      if (end >= start) return []
      range = (function* () {
        for (let i = start; i > end; i += step) yield i
      }())
    }
    return Array.from(range, i => nextGetter(value[i]))
  }
}

export const sliceNav = makeNav({
  update,
  get,
})
