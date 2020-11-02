import { BaseNav } from './baseNav'
import { isNil } from 'util/lang'

export class ObjectNav extends BaseNav {
  copy() {
    const { value } = this
    return isNil(value) ? {} : { ...value }
  }
}
