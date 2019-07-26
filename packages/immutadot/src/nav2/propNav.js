import { isNil } from 'util/lang'
import { makeNav } from './makeNav'
import { onCopy } from './objectNav'

const update = (key, next) => updater => {
  const nextUpdater = next(updater)
  return onCopy((newValue, value) => {
    newValue[key] = nextUpdater(isNil(value) ? undefined : value[key])
  }, true)
}

const get = (key, next) => () => {
  const nextGetter = next()
  return value => {
    if (isNil(value)) return undefined
    return nextGetter(value[key])
  }
}

const unset = (key, next) => () => {
  const nextUnsetter = next()
  if (nextUnsetter) {
    return onCopy(newValue => {
      newValue[key] = nextUnsetter(newValue[key])
    })
  }
  return onCopy(newValue => {
    delete newValue[key]
  })
}

export const propNav = makeNav({
  update,
  get,
  unset,
})

