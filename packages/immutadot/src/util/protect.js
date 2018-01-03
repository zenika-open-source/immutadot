import { isObject } from 'util/lang'

import {
  prop,
} from 'path/consts'

const chain = undefined

/**
* Proxy handler to protect object from mutations.
* @memberof util
* @see {@link util.protect} for more information.
* @private
* @since 0.3.0
 */
class ProtectHandler {

  /**
   * Constructor.
   * @param {Object} chainWrapperRef The reference to the underlying ChainWrapper.
   * @param {Array} [path] The path of the proxy target.
   * @since 0.3.0
   */
  constructor(chainWrapperRef, path = []) {
    this.chainWrapperRef = chainWrapperRef
    this.path = path
  }

  /**
   * Handle property access.
   * @param {*} target Target of the access.
   * @param {string} property Accessed property.
   * @return {*} Either the value of the property or a new Proxy.
   * @since 0.3.0
   */
  get(target, property) {
    const reference = this._peek()[property]
    if (!isObject(reference)) return reference
    return new Proxy(reference, new ProtectHandler(this.chainWrapperRef, [...this.path, [prop, property]]))
  }

  /**
   * Handle property assignment.
   * @param {*} target Target of the assignment.
   * @param {string} property Assigned property.
   * @param {*} value Value to assign.
   * @return {boolean} True if the property was assigned.
   * @since 0.3.0
   */
  set(target, property, value) {
    this.chainWrapperRef.chainWrapper = this.chainWrapperRef.chainWrapper.set([...this.path, [prop, property]], value)
    return true
  }

  /**
   * Handle property deletion.
   * @param {*} target Target of the deletion.
   * @param {string} property Deleted property.
   * @return {boolean} True if the property was deleted.
   * @since 0.3.0
   */
  deleteProperty(target, property) {
    this.chainWrapperRef.chainWrapper = this.chainWrapperRef.chainWrapper.unset([...this.path, [prop, property]])
    return true
  }

  /**
   * Have a peek at target.
   * @return {*} Target with modifications applied.
   * @since 0.3.0
   */
  _peek() {
    let peeked
    this.chainWrapperRef.chainWrapper = this.chainWrapperRef.chainWrapper.peek(_peeked => { peeked = _peeked })
    return !this.path.length ? peeked : peeked[this.path]
  }
}

/**
 * 🚫 This is an experimental feature, do not use.<br />
 * Protect a reference, allowing to apply mutations on it, and then retrieve the result of the mutations.
 * @param {Object} reference Reference to protect.
 * @return {function} Function to be called with a callback accepting the protected reference, returning the result of the mutations performed by the callback.
 * @memberof util
 * @since 0.3.0
 * @example
 * protect({ a: 1, b: { c: 3 } })(protectedRef => {
 *   protectedRef.a++
 *   protectedRef.b.d = protectedRef.a * protectedRef.b.c
 *   delete protectedRef.b.c
 * }) // => { a: 2, b: { d: 6 } }
 */
const protect = reference => {
  if (!isObject(reference)) throw TypeError('Cannot protect a non-object value')
  return callback => {
    const chainWrapper = chain(reference)
    const chainWrapperRef = { chainWrapper }
    const proxy = new Proxy(reference, new ProtectHandler(chainWrapperRef))
    callback(proxy)
    return chainWrapperRef.chainWrapper.value()
  }
}

export { protect }
