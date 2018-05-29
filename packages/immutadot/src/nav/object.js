import { NONE } from './consts'
import { isNil } from 'util/lang'

export function prop(key) {
  return next => obj => {
    const nextValue = isNil(obj) ? next(undefined) : next(obj[key])

    return (updater = NONE) => {
      if (updater === NONE) return nextValue()

      const copy = isNil(obj) ? {} : { ...obj }
      return Object.assign(copy, { [key]: nextValue(updater) })
    }
  }
}
