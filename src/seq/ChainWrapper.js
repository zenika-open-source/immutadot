import * as array from '../array'
import * as collection from '../collection'
import * as core from '../core'
import * as lang from '../lang'
import * as math from '../math'
import * as object from '../object'

import concat from 'lodash/concat'
import flow from 'lodash/flow'
import mapValues from 'lodash/mapValues'
import omit from 'lodash/omit'
import toPath from 'lodash/toPath'

/**
 * Wrapper allowing to make sequences of immutadot functions calls on an object.<br/>
 * Instances are created by calling {@link seq.chain}.<br/>
 * The result of such sequences must be unwrapped with {@link seq.ChainWrapper#value}.
 * @memberof seq
 * @see {@link seq.chain} for more information.
 * @private
 * @since 0.1.8
 */
class ChainWrapper {

  /**
   * This constructor should not be called directly.<br/>
   * Instances are created by calling {@link seq.chain}.
   * @param {Object} object The object to wrap.
   * @param {Array|string} [path] The path of the object on which functions are called.
   * @see {@link seq.chain} for more information.
   * @since 0.1.8
   */
  constructor(object, path) {
    this._object = object
    this._path = path
    this._flow = []
  }

  /**
   * Translates a relative path to an absolute path, using <code>this._path</code> as a base path.
   * @param {Array|string} path A relative path.
   * @return {Array} Absolute path.
   * @since 0.1.11
   */
  _absolutePath(path) {
    return concat(toPath(this._path), toPath(path))
  }

  /**
   * Add a function call to the sequence.
   * @param {function} fn The function to call.
   * @param {Array|string} path The path of the property to be set.
   * @param {...*} args The arguments for the function call.
   * @returns {seq.ChainWrapper} The wrapper instance.
   * @since 0.1.8
   */
  _call(fn, path, args) {
    this._flow.push(object => fn(object, this._absolutePath(path), ...args))
    return this
  }

  /**
   * Executes the chain sequence to resolve the unwrapped object.
   * @returns {Object} Returns the resolved unwrapped object.
   * @example
   * chain({ nested1: { prop: 'old' }, nested2: { prop: 1 } })
   *   .set('nested1.prop', 'new')
   *   .unset('nested2.prop')
   *   .value() // => { nested1: { prop: 'new' }, nested2: {} }
   * @see {@link seq.chain|chain} for more information.
   * @since 0.1.8
   */
  value() {
    return flow(this._flow)(this._object)
  }
}

// Add namespaces functions to the ChainWrapper prototype
[
  array,
  collection,
  omit(core, ['using']),
  lang,
  math,
  object,
].forEach(namespace => Object.assign(
  ChainWrapper.prototype,
  mapValues(
    namespace,
    fn => function(path, ...args) {
      return this._call(fn, path, args) // eslint-disable-line no-invalid-this
    }
  )
))

export default ChainWrapper
