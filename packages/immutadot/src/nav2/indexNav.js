import { length as getLength, isNil } from 'util/lang'
import { makeNav } from './makeNav'
import { onCopy } from './arrayNav'

const resolveIndex = (index, value) => {
  const length = getLength(value)
  if (index >= 0) return index
  if (-index > length) return undefined
  return Math.max(length + index, 0)
}

const update = (pIndex, next) => updater => {
  const nextUpdater = next(updater)
  return onCopy((newValue, value) => {
    const index = resolveIndex(pIndex, value)
    if (index === undefined) return
    newValue[index] = nextUpdater(isNil(value) ? undefined : value[index])
  }, true)
}

const get = (pIndex, next) => () => {
  const nextGetter = next()
  return value => {
    if (isNil(value)) return undefined
    const index = resolveIndex(pIndex, value)
    if (index === undefined) return undefined
    return nextGetter(value[index])
  }
}

const unset = (pIndex, next) => () => {
  const nextUnsetter = next()
  if (nextUnsetter) {
    return onCopy(newValue => {
      const index = resolveIndex(pIndex, newValue)
      if (index === undefined) return // TODO avoid useless copy ?
      newValue[index] = nextUnsetter(newValue[index])
    })
  }
  return onCopy(newValue => {
    const index = resolveIndex(pIndex, newValue)
    if (index === undefined) return // TODO avoid useless copy ?
    delete newValue[index]
  })
}

export const indexNav = makeNav({
  update,
  get,
  unset,
})

