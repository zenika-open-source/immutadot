import { convertArrayMethod } from './convertArrayMethod'

/**
 * Replaces an array adding one or more elements to the end of the former array.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...*} values The values to add.
 * @return {Object} Returns the updated object.
 * @example <caption>Add one element.</caption>
 * push({ nested: { prop: [1, 2] } }, 'nested.prop', 3) // => { nested: { prop: [1, 2, 3] } }
 * @example <caption>Add several elements.</caption>
 * push({ nested: { prop: [1, 2] } }, 'nested.prop', 3, 4) // => { nested: { prop: [1, 2, 3, 4] } }
 * @see {@link https://mdn.io/Array.prototype.push|Array.prototype.push} for more information.
 * @since 0.1.7
 */
const push = convertArrayMethod('push')
export { push, push as default }
