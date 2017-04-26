import flow from 'lodash/flow'
import mapValues from 'lodash/mapValues'

import * as array from '../core'
import * as core from '../core'
import * as lang from '../core'

const namespaces = [
  array,
  core,
  lang,
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
      return this._call(fn, args)
    }
  ),
))

export default ChainWrapper
