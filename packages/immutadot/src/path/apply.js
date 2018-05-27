import {
  allProps,
  index,
  list,
  prop,
  slice,
  toPath,
} from '@immutadot/parser'

import {
  getArrayIndex,
  getSliceBounds,
  pathAlreadyApplied,
} from './utils'

import {
  isNil,
  isString,
  length,
} from 'util/lang'

import { getter } from 'core/get'

/**
 * Makes a copy of value.
 * @function
 * @param {*} value The value to make a copy of
 * @param {boolean} asArray The value should be copied as an array
 * @returns {Object|Array} A copy of value
 * @memberof path
 * @private
 * @since 1.0.0
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
 * Makes a copy of <code>value</code> if necessary.
 * @function
 * @param {*} value The value to make a copy of
 * @param {string} propType The type of the accessed property in <code>value</code>
 * @param {boolean} doCopy Whether to make a copy or not
 * @returns {Object|Array} A copy of value, or not ;)
 * @private
 * @since 1.0.0
 */
const copyIfNecessary = (value, propType, doCopy) => {
  if (!doCopy) return value
  return copy(value, propType === index)
}

/**
 * Operation to apply on a nested property of an object, to be called by {@link core.apply|apply}.
 * @memberof path
 * @callback operation
 * @param {*} obj The last nested object
 * @param {string|number} prop The prop of the last nested object
 * @param {*} value The value of the prop
 * @param {...*} args The remaining args (passed to the {@link core.appliedOperation|appliedOperation})
 * @private
 * @since 1.0.0
 */

/**
 * A function able to apply an {@link core.operation|operation} on a nested property of an object, returned by {@link core.apply|apply}.
 * @memberof path
 * @callback appliedOperation
 * @param {*} obj The last nested object
 * @param {string} path The prop of the last nested object
 * @param {...*} args The remaining args (to be passed to the {@link core.operation|operation})
 * @returns {*} Result of the operation
 * @private
 * @since 1.0.0
 */

/**
 * Creates a function able to apply <code>operation</code> on a nested property.
 * @memberof path
 * @function
 * @param {core.operation} operation The operation to apply
 * @returns {core.appliedOperation} A function able to apply <code>operation</code>
 * @private
 * @since 1.0.0
 */
const apply = operation => {
  const curried = (pPath, ...args) => {
    const path = toPath(pPath)

    if (path.length === 0) throw new TypeError('path should not be empty')

    const applier = (obj, appliedPaths) => {
      const walkPath = (curObj, curPath, remPath, isCopy = false) => {
        const [curProp, ...pathRest] = remPath
        const [propType, propValue] = curProp

        if (propType === slice) {
          const [start, end] = getSliceBounds(propValue, length(curObj))

          const newArr = copy(curObj, true)
          let noop = true

          for (let i = start; i < end; i++) {
            const [iNoop] = walkPath(newArr, curPath, [[index, i], ...pathRest], true)
            noop = noop && iNoop
          }

          if (noop) return [true, curObj]
          return [false, newArr]
        }

        if (propType === list || propType === allProps) {
          const newObj = copy(curObj, false)
          let noop = true

          const listProps = propType === allProps ? Object.keys(newObj) : propValue

          for (const listProp of listProps) {
            const [iNoop] = walkPath(newObj, curPath, [[prop, listProp], ...pathRest], true)
            noop = noop && iNoop
          }

          if (noop) return [true, curObj]
          return [false, newObj]
        }

        const computedProp = propType === index ? getArrayIndex(propValue, length(curObj)) : propValue
        const value = isNil(curObj) ? undefined : curObj[computedProp]
        const doCopy = !isCopy && !pathAlreadyApplied(curPath, appliedPaths)

        if (remPath.length === 1) {
          const newObj = copyIfNecessary(curObj, propType, doCopy)
          const resolvedArgs = args.map(arg => arg[getter] ? arg(obj) : arg)
          operation(newObj, computedProp, value, ...resolvedArgs)
          return [false, newObj]
        }

        const [noop, newValue] = walkPath(value, [...curPath, curProp], pathRest)
        if (noop) return [true, curObj]

        const newObj = copyIfNecessary(curObj, propType, doCopy)
        newObj[computedProp] = newValue
        return [false, newObj]
      }

      const [, result] = walkPath(obj, [], path)
      return result
    }

    applier.path = path

    const unaryApplier = arg => applier(arg)
    unaryApplier.applier = applier

    return unaryApplier
  }

  return (...args) => {
    const [firstArg, ...argsRest] = args
    if (isString(firstArg)) return curried(...args)
    return curried(...argsRest)(firstArg)
  }
}

export { apply }
