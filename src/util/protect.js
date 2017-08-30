import chain from 'seq/chain'
import concat from 'lodash/concat'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import isObject from 'lodash/isObject'

class ProtectHandler {

  constructor(chainWrapperRef, path = []) {
    this.chainWrapperRef = chainWrapperRef
    this.path = path
  }

  get(target, property) {
    const peekedTarget = isEmpty(this.path) ? this._peek() : get(this._peek(), this.path)
    const reference = peekedTarget[property]
    if (!isObject(reference)) return reference
    return new Proxy(reference, new ProtectHandler(this.chainWrapperRef, concat(this.path, property)))
  }

  set(target, property, value) {
    this.chainWrapperRef.chainWrapper = this.chainWrapperRef.chainWrapper.set(concat(this.path, property), value)
    return true
  }

  deleteProperty(target, property) {
    this.chainWrapperRef.chainWrapper = this.chainWrapperRef.chainWrapper.unset(concat(this.path, property))
    return true
  }

  _peek() {
    let peeked
    this.chainWrapperRef.chainWrapper = this.chainWrapperRef.chainWrapper.peek(_peeked => { peeked = _peeked })
    return peeked
  }
}

const protect = reference => {
  if (!isObject(reference)) throw TypeError('Cannot protect a non-object value')
  return callback => {
    const chainWrapper = chain(reference)
    const chainWrapperRef = { chainWrapper }
    const proxy = new Proxy(reference, new ProtectHandler(chainWrapperRef))
    callback(proxy)
    return chainWrapperRef.chainWrapper
  }
}

export default protect
