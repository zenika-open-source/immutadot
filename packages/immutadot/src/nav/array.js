import { isNil, length } from 'util/lang'

class ArrayNav {
  constructor(obj, next) {
    this.obj = obj
    this.next = next
  }

  get length() {
    if (this._length === undefined) this._length = length(this.obj)
    return this._length
  }

  copy() {
    if (isNil(this.obj)) return []
    return Array.isArray(this.obj) ? [...this.obj] : { ...this.obj }
  }
}

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

class SliceNav extends ArrayNav {
  constructor(obj, bounds, next) {
    super(obj, next)
    this.bounds = bounds
  }

  bound(index) {
    if (index < 0) return Math.max(this.length + index, 0)
    return index
  }

  get start() {
    return this.bound(this.bounds[0])
  }

  get end() {
    const [, end] = this.bounds
    return this.bound(end === undefined ? this.length : end)
  }

  get range() {
    const { start, end } = this
    return (function*() {
      for (let i = start; i < end; i++) yield i
    }())
  }

  get() {
    if (isNil(this.obj)) return []
    return Array.from(this.range, index => this.next(this.obj[index]).get())
  }

  update(updater) {
    if (isNil(this.obj)) return []

    const copy = this.copy()
    for (const index of this.range) copy[index] = this.next(this.obj[index]).update(updater)
    return copy
  }
}

export function sliceNav(bounds, next) {
  return obj => new SliceNav(obj, bounds, next)
}
