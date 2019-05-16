import { ArrayNav } from './arrayNav'
import { isNil } from 'util/lang'

class SliceNav extends ArrayNav {
  constructor(value, params, next) {
    super(value, next)
    this.params = params
  }

  bound(index) {
    if (index < 0) return Math.max(this.length + index, 0)
    return index
  }

  get start() {
    const [start] = this.params
    const defaultStart = this.step > 0 ? 0 : this.length - 1
    return this.bound(start === undefined ? defaultStart : start)
  }

  get end() {
    const [, end] = this.params
    const defaultEnd = this.step > 0 ? this.length : -1
    return this.bound(end === undefined ? defaultEnd : end)
  }

  get step() {
    const [, , step] = this.params
    return step === undefined ? 1 : step
  }

  get range() {
    const { start, end, step } = this
    return (function*() {
      for (let i = start; i < end; i += step) yield i
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

  unset() {
    const { _next, value, range } = this

    const copy = this.copy()
    for (const index of range) {
      const next = _next(value[index])
      if (next.final)
        delete copy[index]
      else
        copy[index] = next.unset()
    }
    return copy
  }
}

export function sliceNav(params, next) {
  return value => new SliceNav(value, params, next)
}
