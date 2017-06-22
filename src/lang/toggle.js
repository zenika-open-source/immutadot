import update from '../object/update'

/**
 * Applies <code>!</code> to the property.
 * @function toggle
 * @memberof lang
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @return {Object} Returns the updated object.
 * @example toggle({ nested: { prop: true } }, 'nested.prop') // { nested: { prop: false } }
 * @see {@link object.update|update} for more information.
 * @since 0.1.5
 */
export default update(v => !v)
