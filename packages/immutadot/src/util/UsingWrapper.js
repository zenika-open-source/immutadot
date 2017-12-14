import * as array from 'array'
import * as core from 'core'
import * as lang from 'lang'
import * as object from 'object'
import * as string from 'string'

import { isSymbol } from 'util/lang'

const { get } = core

const head = arr => arr[0]

/**
 * Wrapper allowing to specify one or several paths to use as arguments for an immutadot function call.<br/>
 * Instances are created by calling {@link util.using}.
 * @memberof util
 * @see {@link util.using} for more information.
 * @private
 * @since 0.1.12
 */
class UsingWrapper {

  /**
   * This constructor should not be called directly.<br/>
   * Instances are created by calling {@link util.using}.
   * @param {...(Array|string)} paths The paths to use as arguments.
   * @see {@link util.using} for more information.
   * @since 0.1.12
   */
  constructor(...paths) {
    this._paths = paths
  }

  /**
   * Argument placeholder.
   * @since 0.2.1
   */
  static placeholder = Symbol.for('immutadot.using.placeholder')

  /**
   * Call a function with the specified arguments and possibly some more arguments.
   * @param {function} fn The function to call.
   * @param {Object} object The object to modify.
   * @param {Array|string} path The path of the property to be set.
   * @param {Array} pArgs The arguments for the function call.
   * @return {Object} Returns the updated object.
   * @since 0.1.12
   */
  _call(fn, object, path, pArgs) {
    let callArgs = pArgs
    const args = this._paths.map(usingPath => {
      if (isSymbol(usingPath)) {
        const arg = head(callArgs)
        callArgs = callArgs.slice(1)
        return arg
      }
      return get(object, usingPath)
    }).concat(callArgs)
    return fn(object, path, ...args)
  }
}

// Add namespaces functions to the UsingWrapper prototype
const { convert, unset, toPath, ...filteredCore } = core
const { get: _0, set, unset: _1, update, ...filteredObject } = object
const namespaces = [
  array,
  filteredCore,
  lang,
  filteredObject,
  string,
]
namespaces.forEach(namespace => {
  for (const fnName in namespace) {
    const fn = namespace[fnName]
    UsingWrapper.prototype[fnName] = function(object, path, ...args) {
      return this._call(fn, object, path, args)
    }
  }
})

export { UsingWrapper }
