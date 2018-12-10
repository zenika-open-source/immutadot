import { toLower as _toLower } from 'lodash'
import { apply } from 'immutadot/core'

/**
 * Converts string, as a whole, to lower case just like String#toLowerCase.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @return {Object} Returns the updated object.
 * @example toLower({ nested: { a: "A STRING" } }, 'nested.a') // => { nested: { a: "a string" } }
 * @see {@link https://lodash.com/docs#toLower|lodash.toLower} for more information.
 * @since 1.0.0
 */
const toLower = apply(
  _toLower,
  {
    arity: 1,
    fixedArity: true,
  },
)

export { toLower }
