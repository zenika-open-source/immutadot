import { convertStringMethod } from './convertStringMethod'

/**
 * Replaces matches by former string concatenated with <code>strings</code>.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...string} strings Strings to concatenate.
 * @return {Object} Returns the updated object.
 * @example concat({ nested: { a: "Hello" } }, 'nested.a', ' world', ' !') // => { nested: { a: "Hello world !" } }
 * @see {@link https://mdn.io/String.prototype.concat|String.prototype.concat} for more information.
 * @since 1.0.0
 * @flow
 */
const concat = convertStringMethod('concat')

export { concat }
