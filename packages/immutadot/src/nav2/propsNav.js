import { isNil } from 'util/lang'
import { makeNav } from './makeNav'
import { onCopy } from './objectNav'

const update = (keys, next) => updater => {
  const nextUpdater = next(updater)
  if (keys) {
    return onCopy((newValue, value) => {
      if (isNil(value))
        for (const key of keys) newValue[key] = nextUpdater(undefined)
      else
        for (const key of keys) newValue[key] = nextUpdater(value[key])
    }, true)
  }
  return onCopy((newValue, value) => {
    if (isNil(value)) return
    for (const key of Object.keys(value)) newValue[key] = nextUpdater(value[key])
  }, true)
}

const get = (keys, next) => () => {
  const nextGetter = next()
  if (keys) return value => isNil(value) ? undefined : keys.map(key => nextGetter(value[key]))
  return value => isNil(value) ? undefined : Object.keys(value).map(key => nextGetter(value[key]))
}

const unset = (keys, next) => () => {
  const nextUnsetter = next()
  if (nextUnsetter) {
    if (keys) {
      return onCopy((newValue, value) => {
        if (isNil(value))
          for (const key of keys) newValue[key] = nextUnsetter(undefined)
        else
          for (const key of keys) newValue[key] = nextUnsetter(value[key])
      }, true)
    }
    return onCopy((newValue, value) => {
      for (const key of Object.keys(value)) newValue[key] = nextUnsetter(value[key])
    })
  }
  if (keys) {
    return onCopy(newValue => {
      for (const key of keys) delete newValue[key]
    })
  }
  return onCopy((newValue, value) => {
    for (const key of Object.keys(value)) delete newValue[key]
  })
}

export const propsNav = makeNav({
  update,
  get,
  unset,
})
