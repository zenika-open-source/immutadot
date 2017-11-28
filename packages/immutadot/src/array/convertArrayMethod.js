import { convert } from 'core/convert'

import {
  isNil,
} from 'util/lang'

const copyArray = array => {
  if (isNil(array)) return []
  if (Array.isArray(array)) return [...array]
  return [array]
}

/**
 * Converts an Array method.
 * @memberof array
 * @param {string} method Array method name.
 * @return {function} Returns the wrapped function.
 * @see {@link core.convert|convert} for more information.
 * @since 0.2.0
 * @private
 */
const convertArrayMethod = method => convert((array, ...args) => {
  const newArray = copyArray(array)
  newArray[method](...args)
  return newArray
})

export { convertArrayMethod }
