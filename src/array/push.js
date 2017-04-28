import toArray from 'lodash/toArray'
import update from '../core/update'

/**
 * Replaces by a new array containing the elements of the former array and one or more elements added to the end.
 * @function push
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...*} values The values to add.
 * @return {Object} Returns the updated object.
 * @example <caption>Add one element.</caption>
 * push({ nested: { prop: [1, 2] } }, 'nested.prop', 3) // => { nested: { prop: [1, 2, 3] } }
 * @example <caption>Add several elements.</caption>
 * push({ nested: { prop: [1, 2] } }, 'nested.prop', 3, 4) // => { nested: { prop: [1, 2, 3, 4] } }
 * @see {@link https://lodash.com/docs#toArray|lodash.toArray} for more information.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push|Array.prototype.push} for more information.
 * @see {@link core.update|update}.
 * @since 0.1.7
 */
export default update((value, ...values) => {
  const newValue = toArray(value)
  newValue.push(...values)
  return newValue
})
