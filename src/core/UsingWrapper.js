import * as array from '../array'
import * as collection from '../collection'
import * as core from '../core'
import * as lang from '../lang'
import * as math from '../math'

import at from 'lodash/at'
import concat from 'lodash/concat'
import isArray from 'lodash/isArray'
import map from 'lodash/map'
import mapValues from 'lodash/mapValues'
import omit from 'lodash/omit'
import toPath from 'lodash/toPath'

// FIXME documentation
class UsingWrapper {

  constructor(...paths) {
    this._paths = map(paths.length === 1 && isArray(paths[0]) ? paths[0] : paths, toPath)
  }

  _call(fn, object, path, args) {
    return fn(object, path, ...concat(at(object, this._paths), args))
  }
}

// Add namespaces functions to the UsingWrapper prototype
[
  array,
  collection,
  omit(core, ['unset']),
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
