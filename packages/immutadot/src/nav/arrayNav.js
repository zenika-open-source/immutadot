import { isNil, length } from 'util/lang'

export class ArrayNav {
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
