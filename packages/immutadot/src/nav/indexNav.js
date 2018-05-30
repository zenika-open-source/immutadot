import { ArrayNav } from './arrayNav'
import { isNil } from 'util/lang'

class IndexNav extends ArrayNav {
  constructor(obj, index, next) {
    super(obj, next)
    this._index = index
  }

  get index() {
    const { _index, length } = this
    if (_index >= 0) return _index
    if (-_index > length) return undefined
    return Math.max(length + _index, 0)
  }

  get nextValue() {
    const { index, obj } = this
    return (isNil(obj) || index === undefined) ? this.next(undefined) : this.next(obj[index])
  }

  get() {
    return this.nextValue.get()
  }

  update(updater) {
    const copy = this.copy()
    copy[this.index] = this.nextValue.update(updater)
    return copy
  }
}

export function indexNav(index, next) {
  return obj => new IndexNav(obj, index, next)
}
