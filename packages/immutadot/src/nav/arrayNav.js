import { isNil, length } from 'util/lang'
import { BaseNav } from './baseNav'

export class ArrayNav extends BaseNav {
  get length() {
    if (this._length === undefined) this._length = length(this.value)
    return this._length
  }

  copy() {
    const { value } = this
    if (isNil(value)) return []
    return Array.isArray(value) ? [...value] : { ...value }
  }
}
