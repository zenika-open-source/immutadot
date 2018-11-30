import { curry } from 'core/curry'
import { nav } from 'nav/nav'
import { resolveGetter } from 'core/get'
import { toPath } from '@immutadot/parser'

/**
 * Replaces by the addition of the former number and the given number.
 * @function
 * @memberof lang
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} addend The number to add.
 * @return {Object} Returns the updated object.
 * @example add({ nested: { prop: 2 } }, 'nested.prop', 4) // => { nested: { prop: 6 } }
 * @since 1.0.0
 */
const add = curry(
  (obj, path, addend) => nav(toPath(path))(obj).update(
    value => Number(value) + Number(resolveGetter(addend)),
  ),
)

export { add }
