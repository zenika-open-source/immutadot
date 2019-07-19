import { isNil } from 'util/lang'
import { onCopy } from './objectNav'

const update = (keys, next) => updater => {
  const nextUpdater = next(updater)
  if (keys) {
    return onCopy((newValue, value) => {
      if (isNil(value))
        for (const key of keys) newValue[key] = nextUpdater(undefined)
      else
        for (const key of keys) newValue[key] = nextUpdater(value[key])
    })
  }
  return onCopy((newValue, value) => {
    if (isNil(value)) return
    for (const key of Object.keys(value)) newValue[key] = nextUpdater(value[key])
  })
}

const get = (keys, next) => () => {
  const nextGetter = next()
  if (keys)
    return value => isNil(value) ? undefined : keys.map(key => nextGetter(value[key]))
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

export const propsNav = keys => next => operation => {
  switch (operation) {
  case 'update': return update(keys, next(operation))
  case 'get': return get(keys, next(operation))
  case 'unset': return unset(keys, next(operation))
  }
  throw TypeError(`Unknown navigator operation ${operation}`)
}
