import { copy } from './objectNav'
import { isNil } from 'util/lang'

const update = (key, next) => updater => {
  const nextUpdater = next(updater)
  return value => {
    const newValue = copy(value)
    newValue[key] = nextUpdater(isNil(value) ? undefined : value[key])
    return newValue
  }
}

export const propNav = key => next => operation => {
  switch (operation) {
  case 'update': return update(key, next(operation))
  case 'get': return null
  case 'unset': return null
  }
  throw TypeError(`Unknown navigator operation ${operation}`)
}
