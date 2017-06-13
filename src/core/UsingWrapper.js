import * as array from '../array'
import * as collection from '../collection'
import * as core from '../core'
import * as lang from '../lang'
import * as math from '../math'

import at from 'lodash/at'
import concat from 'lodash/concat'
import map from 'lodash/map'
import mapValues from 'lodash/mapValues'
import omit from 'lodash/omit'
import toPath from 'lodash/toPath'
import { updatePassingArgs } from './update'

/**
 * Wrapper allowing to specify one or several paths to use as arguments for an immutadot function call.<br/>
 * Instances are created by calling {@link core.using}.
 * @memberof core
 * @see {@link core.using} for more information.
 * @private
 * @since 0.1.12
 */
class UsingWrapper {

  /**
   * This constructor should not be called directly.<br/>
   * Instances are created by calling {@link core.using}.
   * @param {...(Array|string)} paths The paths to use as arguments.
   * @see {@link core.using} for more information.
   * @since 0.1.12
   */
  constructor(...paths) {
    this._paths = map(paths, toPath)
  }

  /**
   * Call a function with the specified arguments and possibly some more arguments.
   * @param {function} fn The function to call.
   * @param {Object} object The object to modify.
   * @param {Array|string} path The path of the property to be set.
   * @param {...*} args The arguments for the function call.
   * @return {Object} Returns the updated object.
   * @since 0.1.12
   */
  _call(fn, object, path, args) {
    return fn(object, path, ...concat(at(object, this._paths), args))
  }
}

// Add namespaces functions to the UsingWrapper prototype
[
  array,
  collection,
  {
    ...omit(core, ['unset']), // Unset doesn't take any parameters
    update: updatePassingArgs, // Avoid updater only version of update
  },
  lang,
  math,
].forEach(namespace => Object.assign(
  UsingWrapper.prototype,
  mapValues(
    namespace,
    fn => function(object, path, ...args) {
      return this._call(fn, object, path, args) // eslint-disable-line no-invalid-this
    }
  )
))

export default UsingWrapper
