import {
  isArrayProp,
} from './path.utils'

/**
 * Makes a copy of value.
 * @param {*} value The value to make a copy of
 * @param {boolean} asArray The value should be copied as an array
 * @returns {Object|Array} A copy of value
 * @memberof core
 * @private
 * @since 0.4.0
 */
const copy = (value, asArray) => {
  if (value === undefined || value === null) {
    if (asArray)
      return []
    return {}
  }
  if (Array.isArray(value)) return [...value]
  return { ...value }
}

const callback = (obj, prop) => {
  if (obj === undefined || obj === null) return undefined
  return obj[prop]
}

/**
 * Operation to apply on a nested property of an object, to be called by {@link core.apply|apply}.
 * @memberof core
 * @callback operation
 * @param {*} value The resolved unwrapped object
 * @returns {*} Result of the operation
 * @private
 * @since 0.4.0
 */

/**
 * Applies <code>operation</code> on a nested property of <code>obj</code>.
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
    if (curPath.length === 0) return operation(curObj)

    const [prop] = curPath

    const value = callback(curObj, prop)

    const newValue = walkPath(value, curPath.slice(1))

    const newObj = copy(curObj, isArrayProp(prop))
    newObj[prop] = newValue

    return newObj
  }

  return walkPath(obj, path)
}

export { apply }
