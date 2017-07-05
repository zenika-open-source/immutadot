import convert from '../util/convert'
import toArray from 'lodash/toArray'

/**
 * Converts an Array method.
 * @function convertArrayMethod
 * @memberof array
 * @param {string} method Array method name.
 * @return {function} Returns the wrapped function.
 * @see {@link util.convert|convert} for more information.
 * @see {@link https://lodash.com/docs#toArray|lodash.toArray} for more information.
 * @since 0.1.14
 * @private
 */
export default method => convert((array, ...args) => {
  const newArray = toArray(array)
  newArray[method](...args)
  return newArray
})
