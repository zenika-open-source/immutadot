import { apply } from 'path/apply'

const unsetOperation = (obj, prop) => { delete obj[prop] }

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
const unset = apply(unsetOperation)

export { unset }
