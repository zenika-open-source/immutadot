import * as array from '../array'
import * as core from '../core'
import * as lang from '../lang'
import * as math from '../math'

import flow from 'lodash/flow'
import mapValues from 'lodash/mapValues'

const namespaces = [
  array,
  core,
  lang,
  math,
]

class ChainWrapper {

  constructor(value) {
    this._value = value
    this._flow = []
  }

  _call(fn, args) {
    this._flow.push(value => fn(value, ...args))
    return this
  }

  value() {
    return flow(this._flow)(this._value)
  }
}

// Add namespaces functions to the ChainWrapper prototpye
namespaces.forEach(namespace => Object.assign(
  ChainWrapper.prototype,
  mapValues(
    namespace,
    fn => function(...args) {
      return this._call(fn, args) // eslint-disable-line no-invalid-this
    },
  ),
))

export default ChainWrapper
