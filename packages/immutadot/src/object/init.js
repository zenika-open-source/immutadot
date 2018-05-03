import { set } from 'core/set'

/**
 * Initialize a new Object with the value set at <code>path</code>
 * @function
 * @memberof object
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set
 * @return {Object} Returns the new object initialized.
 * @example init({}, 'nested.prop', 1) // => { nested: { prop: 1 } }
 * @since 2.0.0
 */
const init = (path, value) => set({}, path, value)

export { init }

