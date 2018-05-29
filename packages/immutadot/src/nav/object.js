import { isNil } from 'util/lang'

class PropNav {
  constructor(obj, key, next) {
    this.obj = obj
    this.key = key
    this.next = next
  }

  get nextValue() {
    return isNil(this.obj) ? this.next(undefined) : this.next(this.obj[this.key])
  }

  get() {
    return this.nextValue.get()
  }

  copy() {
    return isNil(this.obj) ? {} : { ...this.obj }
  }

  update(updater) {
    const copy = this.copy()
    copy[this.key] = this.nextValue.update(updater)
    return copy
  }
}

export function propNav(key, next) {
  return obj => new PropNav(obj, key, next)
}
