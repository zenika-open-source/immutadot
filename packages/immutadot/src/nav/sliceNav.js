import { ArrayNav } from './arrayNav'
import { isNil } from 'util/lang'

const resolveIndex = (index, length) => index >= 0 ? index : Math.max(length + index, 0)

class SliceNav extends ArrayNav {
  constructor(value, params, next) {
    super(value, next)
    this.params = params
  }

  get start() {
    const { length, params: [start] } = this
    if (length === 0) return 0
    if (start !== undefined) return resolveIndex(start, length)
    return this.step > 0 ? 0 : length - 1
  }

  get end() {
    const { length, params: [, end] } = this
    if (length === 0) return 0
    if (end !== undefined) return resolveIndex(end, length)
    return this.step > 0 ? length : -1
  }

  get step() {
    const [, , step] = this.params
    return step === undefined ? 1 : step
  }

  get range() {
    const { start, end, step } = this
    if (step > 0) {
      return (function*() {
        for (let i = start; i < end; i += step) yield i
      }())
    }
    return (function*() {
      // eslint-disable-next-line for-direction
      for (let i = start; i > end; i += step) yield i
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
