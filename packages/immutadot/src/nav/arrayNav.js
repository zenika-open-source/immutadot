import { isNil, length } from 'util/lang'
import { BaseNav } from './baseNav'

export class ArrayNav extends BaseNav {
  get length() {
    return length(this.value)
  }

  copy() {
    const { value } = this
    if (isNil(value)) return []
    return Array.isArray(value) ? [...value] : { ...value }
  }
}
