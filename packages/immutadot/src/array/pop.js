import { convertArrayMethod } from './convertArrayMethod'

/**
 * Replaces by an array of elements with last element removed.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @return {Object} Returns the updated object.
 * @example pop({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop') // => { nested: { prop: [1, 2, 3] } }
 * @see {@link https://mdn.io/Array.prototype.pop|Array.prototype.pop} for more information.
 * @since 1.0.0
 */
const pop = convertArrayMethod('pop')

export { pop }
