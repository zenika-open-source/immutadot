import { set } from 'core/set'

/**
 * create a new Object with the value set at <code>path</code>
 * @function
 * @memberof object
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set
 * @return {Object} Returns the new object createialized.
 * @example create({}, 'nested.prop', 1) // => { nested: { prop: 1 } }
 * @since 2.0.0
 */
const create = (path, value) => set({}, path, value)

export { create }

