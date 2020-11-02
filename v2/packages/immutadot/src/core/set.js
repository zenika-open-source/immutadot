import { apply } from './apply'

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
const set = apply((_, value) => value, { fixedArity: true })

export { set }
