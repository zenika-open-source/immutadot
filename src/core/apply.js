import {
  getSliceBounds,
  isIndex,
  isSlice,
} from './path.utils'
import { unsafeToPath } from './toPath'

import {
  isNil,
  length,
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

/**
 * Operation to apply on a nested property of an object, to be called by {@link core.apply|apply}.
 * @memberof core
 * @callback operation
 * @param {*} obj The last nested object
 * @param {string|number} prop The prop of the last nested object
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
  const walkPath = (curObj, curPath, doCopy = true) => {
    const [prop, ...pathRest] = curPath

    if (isSlice(prop)) {
      const [start, end] = getSliceBounds(prop, length(curObj))

      const newArr = copy(curObj, true)

      for (let i = start; i < end; i++)
        walkPath(newArr, [i, ...pathRest], false)

      return newArr
    }

    const value = isNil(curObj) ? undefined : curObj[prop]

    let newObj = curObj
    if (doCopy) newObj = copy(curObj, isIndex(prop))

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
