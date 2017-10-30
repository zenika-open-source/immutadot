import { apply } from './apply'
import { unsafeToPath } from './toPath'

/**
 * Sets the value at <code>path</code> of <code>object</code>.
 * @function
 * @memberof core
 * @param {*} obj The object to modify.
 * @param {string|Array} path The path of the property to set.
 * @param {*} value The value to set.
 * @return {*} Returns the updated object.
 * @example set({ nested: { prop: 'old' } }, 'nested.prop', 'new') // => { nested: { prop: 'new' } }
 * @since 0.4.0
 */
const set = (obj, path, value) => apply(obj, unsafeToPath(path), () => value)

export { set }
