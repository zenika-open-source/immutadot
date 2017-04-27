import * as array from '../array'
import * as collection from '../collection'
import * as core from '../core'
import * as lang from '../lang'
import * as math from '../math'

import flow from 'lodash/flow'
import mapValues from 'lodash/mapValues'

/**
 * Wrapper allowing to make sequences of immutadot functions calls on a value.
 * Instances are created by calling {@link chain}.
 * The result of such sequences must be unwrapped with {@link ChainWrapper#value}.
 * @memberof seq
 * @see {@link chain} for more information.
 * @since 0.1.8
 */
class ChainWrapper {

  /**
   * This constructor should not be called directly.
   * Instances are created by calling {@link chain}.
   * @param {*} value The value to wrap.
   * @protected
   * @see {@link chain} for more information.
   * @since 0.1.8
   */
  constructor(value) {
    this._value = value
    this._flow = []
  }

  /**
   * Add a function call to the sequence.
   * @param {Function} fn The function to call.
   * @param {...*} args The arguments for the function call.
   * @returns {ChainWrapper} The wrapper instance.
   * @private
   * @since 0.1.8
   */
  _call(fn, args) {
    this._flow.push(value => fn(value, ...args))
    return this
  }

  /**
   * Executes the chain sequence to resolve the unwrapped value.
   * @returns {Object} Returns the resolved unwrapped value.
   * @since 0.1.8
   */
  value() {
    return flow(this._flow)(this._value)
  }
}

// Add namespaces functions to the ChainWrapper prototpye
[
  array,
  collection,
  core,
  lang,
  math,
].forEach(namespace => Object.assign(
  ChainWrapper.prototype,
  mapValues(
    namespace,
    fn => function(...args) {
      return this._call(fn, args) // eslint-disable-line no-invalid-this
    },
  ),
))

export default ChainWrapper
