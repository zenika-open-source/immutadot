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

const getRange = (pStart, pEnd, pStep, value) => {
  const step = pStep === undefined ? 1 : pStep
  const length = getLength(value)
  const start = resolveStart(pStart, length, step)
  const end = resolveEnd(pEnd, length, step)
  if (step > 0) {
    if (end <= start) return null
    return {
      [Symbol.iterator]: () => {
        let i = start
        return {
          next: () => {
            if (i < end) {
              const res = {
                value: i,
                done: false,
              }
              i += step
              return res
            }
            return { done: true }
          },
        }
      },
    }
  }
  if (end >= start) return null
  return {
    [Symbol.iterator]: () => {
      let i = start
      return {
        next: () => {
          if (i > end) {
            const res = {
              value: i,
              done: false,
            }
            i += step
            return res
          }
          return { done: true }
        },
      }
    },
  }
}

const update = ([pStart, pEnd, pStep], next) => updater => {
  const nextUpdater = next(updater)
  return onCopy((newValue, value) => {
    const range = getRange(pStart, pEnd, pStep, value)
    if (!range) return // TODO avoid useless copy
    if (isNil(value))
      for (const i of range) newValue[i] = nextUpdater(undefined)
    else
      for (const i of range) newValue[i] = nextUpdater(value[i])
  }, true)
}

const get = ([pStart, pEnd, pStep], next) => () => {
  const nextGetter = next()
  return value => {
    if (isNil(value)) return []
    const range = getRange(pStart, pEnd, pStep, value)
    if (!range) return []
    return Array.from(range, i => nextGetter(value[i]))
  }
}

const unsetSlice = (pStart, pEnd, pStep, nextUnsetter) => () => onCopy(value => {
  const range = getRange(pStart, pEnd, pStep, value)
  if (!range) return // TODO avoid useless copy
  for (const i of range) value[i] = nextUnsetter(value[i])
})

const deleteSlice = (pStart, pEnd, pStep) => () => onCopy(value => {
  const range = getRange(pStart, pEnd, pStep, value)
  if (!range) return // TODO avoid useless copy
  for (const i of range) delete value[i]
})

const unset = ([pStart, pEnd, pStep], next) => {
  const nextUnsetter = next()
  return nextUnsetter ? unsetSlice(pStart, pEnd, pStep, nextUnsetter) : deleteSlice(pStart, pEnd, pStep)
}

export const sliceNav = makeNav({
  update,
  get,
  unset,
})
