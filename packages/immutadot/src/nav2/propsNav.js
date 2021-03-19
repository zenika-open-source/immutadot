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
    for (const key of Object.keys(value)) newValue[key] = nextUpdater(value[key])
  })
}

const get = (keys, next) => () => {
  const nextGetter = next()
  if (keys) return value => isNil(value) ? undefined : keys.map(key => nextGetter(value[key]))
  return value => isNil(value) ? undefined : Object.keys(value).map(key => nextGetter(value[key]))
}

const unsetKeys = (keys, nextUnsetter) => () => onCopy(value => {
  for (const key of keys) value[key] = nextUnsetter(value[key])
})

const unsetAll = nextUnsetter => () => onCopy(value => {
  for (const key of Object.keys(value)) value[key] = nextUnsetter(value[key])
})

const deleteKeys = keys => () => onCopy(value => {
  for (const key of keys) delete value[key]
})

const deleteAll = () => onCopy(value => {
  for (const key of Object.keys(value)) delete value[key]
})

const unset = (keys, next) => {
  const nextUnsetter = next()
  if (nextUnsetter)
    return keys ? unsetKeys(keys, nextUnsetter) : unsetAll(nextUnsetter)
  return keys ? deleteKeys(keys) : deleteAll
}

export const propsNav = makeNav({
  update,
  get,
  unset,
})
