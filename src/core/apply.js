import {
  isIndex,
  isSlice,
} from './path.utils'
import { unsafeToPath } from './toPath'

import {
  isNaturalInteger,
  isNil,
} from 'util/lang'

/**
 * Makes a copy of value.
 * @function
 * @param {*} value The value to make a copy of
 * @param {boolean} asArray The value should be copied as an array
 * @returns {Object|Array} A copy of value
 * @memberof core
 * @private
 * @since 0.4.0
 */
const copy = (value, asArray) => {
  if (isNil(value)) {
    if (asArray) return []
    return {}
  }
  if (Array.isArray(value)) return [...value]
  return { ...value }
}

// FIXME move ?
const getLength = value => {
  if (isNil(value) || !isNaturalInteger(value.length)) return 0
  return value.length
}

// FIXME move ?
const min = (a, b) => a < b ? a : b

const callback = (obj, prop) => {
  if (isNil(obj)) return undefined
  return obj[prop]
}

/**
 * Operation to apply on a nested property of an object, to be called by {@link core.apply|apply}.
 * @memberof core
 * @callback operation
 * @param {*} obj The last nested object
 * @param {string|number|Array<number>} prop The prop of the last nested object
 * @param {*} value The value of the prop
 * @returns {*} Result of the operation
 * @private
 * @since 0.4.0
 */

/**
 * Applies <code>operation</code> on a nested property of <code>obj</code>.
 * @function
 * @param {*} obj The object to apply <code>operation</code> on
 * @param {string|Array} path The path of the property to apply <code>operation</code> on
 * @param {core.operation} operation The operation to apply
 * @returns {*} The new object, result of the applied operation
 * @memberof core
 * @private
 * @since 0.4.0
 */
const apply = (obj, path, operation) => {
  const walkPath = (curObj, curPath) => {
    const [prop, ...pathRest] = curPath

    if (isSlice(prop)) {
      const length = getLength(curObj)
      const startIndex = prop[0] === undefined ? 0 : min(prop[0], length)
      const endIndex = prop[1] === undefined ? length : min(prop[1], length)

      let curSliceObj = curObj
      for (let i = startIndex; i < endIndex; i++)
        curSliceObj = walkPath(curSliceObj, [i, ...pathRest])
      return curSliceObj
    }

    const value = callback(curObj, prop)

    const newObj = copy(curObj, isIndex(prop))

    if (curPath.length === 1) {
      operation(newObj, prop, value)
      return newObj
    }

    newObj[prop] = walkPath(value, pathRest)

    return newObj
  }

  return walkPath(obj, unsafeToPath(path))
}

export { apply }
