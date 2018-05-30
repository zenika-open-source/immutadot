import { ArrayNav } from './arrayNav'
import { isNil } from 'util/lang'

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
