import { convertArrayMethod } from '../util/convert'

/**
 * Adds one or more elements at the start of an array.
 * @function unshift
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...*} values The values to add.
 * @return {Object} Returns the updated object.
 * @example <caption>Add one element.</caption>
 * push({ nested: { prop: [1, 2] } }, 'nested.prop', 3) // => { nested: { prop: [3, 1, 2] } }
 * @example <caption>Add several elements.</caption>
 * push({ nested: { prop: [1, 2] } }, 'nested.prop', 3, 4) // => { nested: { prop: [3, 4, 1, 2] } }
 * @see {@link https://mdn.io/Array.prototype.unshift|Array.prototype.unshift} for more information.
 * @since 0.1.7
 */
export default convertArrayMethod('unshift')
