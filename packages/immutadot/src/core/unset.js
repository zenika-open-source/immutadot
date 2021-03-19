import { curry } from './curry'
import { nav } from 'nav/nav'
import { toPath } from 'immutadot-parser'

/**
 * Removes the property at <code>path</code> of <code>object</code>.
 * @function
 * @memberof core
 * @param {Object} obj The object to modify.
 * @param {Array|string} path The path of the property to unset.
 * @return {Object} Returns the updated object.
 * @example unset({ nested: { prop: 'value' } }, 'nested.prop') // => { nested: {} }
 * @since 1.0.0
 */
// FIXME do not use curry here ?
const unset = curry((obj, path) => nav(toPath(path)).unset()(obj), { fixedArity: true })

export { unset }
