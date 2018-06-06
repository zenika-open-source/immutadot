import { ObjectNav } from './objectNav'
import { isNil } from 'util/lang'

class PropNav extends ObjectNav {
  constructor(value, key, next) {
    super(value, next)
    this.key = key
  }

  get next() {
    const { _next, key, value } = this
    return isNil(value) ? _next(undefined) : _next(value[key])
  }

  get() {
    return this.next.get()
  }

  update(updater) {
    const copy = this.copy()
    copy[this.key] = this.next.update(updater)
    return copy
  }
}

export function propNav(key, next) {
  return value => new PropNav(value, key, next)
}
