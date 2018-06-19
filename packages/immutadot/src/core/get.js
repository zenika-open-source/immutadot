import { nav } from 'nav/nav'
import { toPath } from '@immutadot/parser'

const isGetter = Symbol('isGetter')

/**
* Gets the value at <code>path</code> of <code>obj</code>.
* @memberof core
* @param {*} [obj] The object.
* @param {string|Array} path The path of the property to get.
* @return {*} Returns the value
* @example get({ nested: { prop: 'val' } }, 'nested.prop') // => 'val'
* @since 1.0.0
*/
function get(...args) {
  if (args.length >= 2)
    return _get(...args)

  const getter = obj => _get(obj, ...args)
  getter[isGetter] = true

  return getter
}

function _get(obj, path) {
  return nav(toPath(path))(obj).get()
}

export { get, isGetter }
