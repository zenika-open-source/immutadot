import { isString } from 'util/lang'
import { nav } from 'nav/nav'
import { toPath } from '@immutadot/parser'

/**
 * Sets the value at <code>path</code> of <code>obj</code>.
 * @memberof core
 * @param {*} obj The object to modify.
 * @param {string|Array} path The path of the property to set.
 * @param {*} value The value to set.
 * @return {*} Returns the updated object.
 * @example set({ nested: { prop: 'old' } }, 'nested.prop', 'new') // => { nested: { prop: 'new' } }
 * @since 1.0.0
 */
function set(obj, path, value) {
  return nav(toPath(path))(obj).update(() => value)
}

const curried = (path, value) => obj => set(obj, path, value)

function optionallyCurried(...args) {
  return isString(args[0]) ? curried(...args) : set(...args)
}

export { optionallyCurried as set }
