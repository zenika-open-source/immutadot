import _xor from 'lodash/xor'
import { convert } from 'core/convert'

/**
 * Replaces an array by the symmetric difference of the former array and the given arrays.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Array} arrays The arrays to inspect.
 * @return {Object} Returns the updated object.
 * @playground
 * require("lodash/package.json")
 * const { xor } = require("immutadot")
 * xor({ nested: { prop: [1, 2] } }, 'nested.prop', [2, 3]) // => { nested: { prop: [1, 3] } }
 * @see {@link https://lodash.com/docs#xor|lodash.xor} for more information.
 * @since 0.1.6
 * @flow
 */
const xor = convert(_xor)
export { xor }
