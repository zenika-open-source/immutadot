import toArray from 'lodash/toArray'
import update from '../core/update'

/**
 * Replaces by an a new array with one or more elements added to the end of the former array.
 * @function push
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...*} values The values to add.
 * @return {Object} Returns the updated object.
 * @see {@link https://lodash.com/docs#toArray|Lodash.toArray} for more information
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push|Array.prototype.push} for more information
 * @since 0.1.7
 */
export default update((value, ...values) => {
  const newValue = toArray(value)
  newValue.push(...values)
  return newValue
})
