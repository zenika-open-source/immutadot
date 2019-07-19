import { isNil } from 'util/lang'
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

export const propNav = key => next => operation => {
  switch (operation) {
  case 'update': return update(key, next(operation))
  case 'get': return get(key, next(operation))
  case 'unset': return unset(key, next(operation))
  }
  throw TypeError(`Unknown navigator operation ${operation}`)
}
