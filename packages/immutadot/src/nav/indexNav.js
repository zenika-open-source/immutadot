import { ArrayNav } from './arrayNav'
import { isNil } from 'util/lang'

class IndexNav extends ArrayNav {
  constructor(value, index, next) {
    super(value, next)
    this._index = index
  }

  get index() {
    const { _index, length } = this
    if (_index >= 0) return _index
    if (-_index > length) return undefined
    return Math.max(length + _index, 0)
  }

  get next() {
    const { _next, index, value } = this
    return (isNil(value) || index === undefined) ? _next(undefined) : _next(value[index])
  }

  get() {
    return this.next.get()
  }

  update(updater) {
    const copy = this.copy()
    copy[this.index] = this.next.update(updater)
    return copy
  }

  unset() {
    const copy = this.copy()
    if (this.next.final)
      delete copy[this.index]
    else
      copy[this.index] = this.next.unset()
    return copy
  }
}

export function indexNav(index, next) {
  return value => new IndexNav(value, index, next)
}
