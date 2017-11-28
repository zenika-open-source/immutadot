import * as array from 'array'
import * as core from 'core'
import * as lang from 'lang'
import * as math from 'math'
import * as object from 'object'
import * as string from 'string'

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
   * @param {Object} wrapped The object to wrap.
   * @param {Array|string} [path] The path of the object on which functions are called.
   * @param {Array} [pFlow=[]] Current calls flow.
   * @see {@link seq.chain} for more information.
   * @since 0.1.8
   */
  constructor(wrapped, path, pFlow = []) {
    this._wrapped = wrapped
    this._path = path
    this._flow = pFlow
    this._commited = null
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
   * @returns {seq.ChainWrapper} The new wrapper instance.
   * @since 0.1.8
   */
  _call(fn, path, args) {
    return new ChainWrapper(
      this._wrapped,
      this._path,
      concat(this._flow, object => fn(object, this._absolutePath(path), ...args)),
    )
  }

  /**
   * Executes the chain sequence.
   * @returns {seq.ChainWrapper} The new wrapper instance.
   * @since 0.3.0
   */
  commit() {
    if (this._flow.length === 0) return this

    if (this._commited === null) {
      this._commited = new ChainWrapper(
        flow(this._flow)(this._wrapped),
        this._path,
      )
    }

    return this._commited
  }

  /**
   * Executes the chain sequence and calls <code>callback</code> with the unwrapped object.
   * @param {seq.peekCallback} callback Function to be called with the resolved unwrapped value.
   * @returns {seq.ChainWrapper} The new wrapper instance.
   * @todo Add an example.
   * @since 0.3.0
   */
  peek(callback) {
    const commited = this.commit()

    callback(commited._wrapped)

    return commited
  }

  /**
   * Executes the chain sequence and returns the unwrapped object.
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
    return this.commit()._wrapped
  }
}

/**
 * Function to be called by {@link seq.peek|peek} with the resolved unwrapped value.
 * @memberof seq
 * @callback peekCallback
 * @param {Object} unwrapped The resolved unwrapped object
 * @since 0.3.0
 */

// Add namespaces functions to the ChainWrapper prototype
[
  array,
  omit(core, ['convert', 'toPath']),
  lang,
  math,
  omit(object, ['set', 'unset', 'update']),
  string,
].forEach(namespace => Object.assign(
  ChainWrapper.prototype,
  mapValues(
    namespace,
    fn => function(path, ...args) {
      return this._call(fn, path, args) // eslint-disable-line no-invalid-this
    },
  ),
))

export { ChainWrapper }
