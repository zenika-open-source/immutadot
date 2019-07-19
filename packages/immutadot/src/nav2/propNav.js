import { isNil } from 'util/lang'
import { makeNav } from './makeNav'
import { onCopy } from './objectNav'

const update = (key, next) => updater => {
  const nextUpdater = next(updater)
  return onCopy((newValue, value) => {
    newValue[key] = nextUpdater(isNil(value) ? undefined : value[key])
  })
}

const get = (key, next) => () => {
  const nextGetter = next()
  return value => nextGetter(isNil(value) ? undefined : value[key])
}

const unset = (key, next) => () => {
  const nextUnsetter = next()
  if (nextUnsetter) {
    return onCopy((newValue, value) => {
      newValue[key] = nextUnsetter(isNil(value) ? undefined : value[key])
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

