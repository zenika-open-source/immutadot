import _add from 'lodash/add'
import { convert } from 'core/convert'

/**
 * Replaces by the addition of the former number and the given number.
 * @function
 * @memberof math
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} addend The number to add.
 * @return {Object} Returns the updated object.
 * @playground
 * require("lodash/package.json")
 * const { add } = require("immutadot")
 * add({ nested: { prop: 2 } }, 'nested.prop', 4) // => { nested: { prop: 6 } }
 * @see {@link https://lodash.com/docs#add|lodash.add} for more information.
 * @since 0.1.7
 * @flow
 */
const add = convert(_add)
export { add }
