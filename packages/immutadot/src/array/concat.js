import { applyArrayMethod } from './applyArrayMethod'

/**
 * Replaces an array concatenating the former array with additional arrays and/or values.<br/>
 * ⚠ Due to name conflicts, this function is named <code>arrayConcat</code> when imported from top level (<code>import { arrayConcat } from 'immutadot'</code>).
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Array} arrays The arrays to concatenate.
 * @return {Object} Returns the updated object.
 * @example concat({ nested: { prop: [1, 2] } }, 'nested.prop', [3, 4]) // => { nested: { prop: [1, 2, 3, 4] } }
 * @see {@link https://mdn.io/Array.prototype.concat|Array.prototype.concat} for more information.
 * @since 0.2.0
 */
const concat = applyArrayMethod('concat', { mutating: false })

export { concat }
