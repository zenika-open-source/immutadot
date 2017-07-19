import chain from 'seq/chain'
import concat from 'lodash/concat'
import isObject from 'lodash/isObject'

class ProtectHandler {

  constructor(chainWrapper, path = []) {
    this.chainWrapper = chainWrapper
    this.path = path
  }

  get(target, property) {
    const reference = target[property]
    if (!isObject(reference)) return reference
    return new Proxy(reference, new ProtectHandler(this.chainWrapper), concat(this.path, property))
  }
}

const protect = reference => {
  if (!isObject(reference)) throw TypeError('Cannot protect a non-object value')
  return callback => {
    const chainWrapper = chain(reference)
    const proxy = new Proxy(reference, new ProtectHandler(chainWrapper))
    return callback(proxy, chainWrapper)
  }
}

export default protect
