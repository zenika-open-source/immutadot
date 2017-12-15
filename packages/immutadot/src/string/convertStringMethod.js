import { convert } from 'core/convert'
import { toString } from 'util/lang'

export function convertStringMethod(name) {
  return convert((arg, ...args) => toString(arg)[name](...args))
}
