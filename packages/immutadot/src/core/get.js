import { nav } from 'nav/nav'
import { toPath } from 'immutadot-parser'

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
  if (args.length >= 2) return nav(toPath(args[1])).get()(args[0])

  const getter = nav(toPath(args[0])).get()
  getter[isGetter] = true

  return getter
}

function resolveGetter(value, obj) {
  if (value && value[isGetter]) return value(obj)
  return value
}

export { get, resolveGetter }
