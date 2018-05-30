import { ArrayNav } from './arrayNav'
import { isNil } from 'util/lang'

class SliceNav extends ArrayNav {
  constructor(value, bounds, next) {
    super(value, next)
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
    const { _next, value, range } = this

    if (isNil(value)) return []

    return Array.from(range, index => _next(value[index]).get())
  }

  update(updater) {
    const { _next, value, range } = this

    const copy = this.copy()
    for (const index of range) copy[index] = _next(value[index]).update(updater)
    return copy
  }
}

export function sliceNav(bounds, next) {
  return value => new SliceNav(value, bounds, next)
}
