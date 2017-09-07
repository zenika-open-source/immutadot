import * as array from 'array'
import * as collection from 'collection'
import * as lang from 'lang'
import * as math from 'math'
import * as object from 'object'
import * as string from 'string'

import concat from 'lodash/concat'
import drop from 'lodash/drop'
import get from 'lodash/get'
import head from 'lodash/head'
import isSymbol from 'lodash/isSymbol'
import map from 'lodash/map'
import mapValues from 'lodash/mapValues'
import omit from 'lodash/omit'

/**
 * Wrapper allowing to specify one or several paths to use as arguments for an immutadot function call.<br/>
 * Instances are created by calling {@link object.using}.
 * @memberof util
 * @see {@link object.using} for more information.
 * @private
 * @since 0.1.12
 */
class UsingWrapper {

  /**
   * This constructor should not be called directly.<br/>
   * Instances are created by calling {@link object.using}.
   * @param {...(Array|string)} paths The paths to use as arguments.
   * @see {@link object.using} for more information.
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
    const args = concat(
      map(this._paths, usingPath => {
        if (isSymbol(usingPath)) {
          const arg = head(callArgs)
          callArgs = drop(callArgs)
          return arg
        }
        return get(object, usingPath)
      }),
      callArgs,
    )
    return fn(object, path, ...args)
  }
}

// Add namespaces functions to the UsingWrapper prototype
[
  array,
  collection,
  { ...omit(object, ['unset']) },
  lang,
  math,
  object,
  string,
].forEach(namespace => Object.assign(
  UsingWrapper.prototype,
  mapValues(
    namespace,
    fn => function(object, path, ...args) {
      return this._call(fn, object, path, args) // eslint-disable-line no-invalid-this
    },
  ),
))

export { UsingWrapper, UsingWrapper as default }
