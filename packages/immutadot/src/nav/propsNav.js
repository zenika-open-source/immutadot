import { ObjectNav } from './objectNav'
import { isNil } from 'util/lang'

class PropsNav extends ObjectNav {
  constructor(value, keys, next) {
    super(value, next)
    this._keys = keys
  }

  get keys() {
    const { _keys, value } = this

    if (_keys !== undefined) return _keys

    return isNil(value) ? [] : Object.keys(value)
  }

  get() {
    const { _next, keys, value } = this

    return keys.map(key => _next(value[key]))
  }

  update(updater) {
    const { _next, keys, value } = this

    const copy = this.copy()
    for (const key of keys) copy[key] = _next(value[key]).update(updater)
    return copy
  }
}

export function propsNav(keys, next) {
  return value => new PropsNav(value, keys, next)
}
