import { ObjectNav } from './objectNav'
import { isNil } from 'util/lang'

class AllPropsNav extends ObjectNav {
  get() {
    const { _next, value } = this

    if (isNil(value)) return []

    return Object.keys(value).map(key => _next(value[key]))
  }

  update(updater) {
    const { _next, value } = this

    const copy = this.copy()
    for (const key of Object.keys(copy)) copy[key] = _next(value[key]).update(updater)
    return copy
  }
}

export function allPropsNav(_, next) {
  return value => new AllPropsNav(value, next)
}
