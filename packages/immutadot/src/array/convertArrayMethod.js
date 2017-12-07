import { convert } from 'core/convert'

import {
  isNil,
} from 'util/lang'

const toArray = array => {
  if (isNil(array)) return []
  if (Array.isArray(array)) return array
  return [array]
}

const toArrayCopy = array => {
  if (isNil(array)) return []
  if (Array.isArray(array)) return [...array]
  return [array]
}

const callMethodReturnResult = (array, method, args) => array[method](...args)

const callMethodReturnArray = (array, method, args) => {
  array[method](...args)
  return array
}

/**
 * Converts an Array method.
 * @memberof array
 * @param {string} method Array method name.
 * @param {boolean} [mutating=true] Whether the method mutates the array.
 * @return {function} Returns the wrapped function.
 * @see {@link core.convert|convert} for more information.
 * @since 0.2.0
 * @private
 */
const convertArrayMethod = (method, mutating = true) => {
  const getArray = mutating ? toArrayCopy : toArray
  const callMethod = mutating ? callMethodReturnArray : callMethodReturnResult
  return convert((value, ...args) => callMethod(getArray(value), method, args))
}

export { convertArrayMethod }
