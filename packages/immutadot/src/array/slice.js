import { convertArrayMethod } from './convertArrayMethod'

/**
 * Replaces an array by a slice of the former array from <code>start</code> up to, but not including, <code>end</code>.<br/>
 * ⚠ Due to name conflicts, this function is named <code>arraySlice</code> when imported from top level (<code>import { arraySlice } from 'immutadot'</code>).
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @return {Object} Returns the updated object.
 * @example slice({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', 1, 3) // => { nested: { prop: [2, 3] } }
 * @see {@link https://mdn.io/Array.prototype.slice|Array.prototype.slice} for more information.
 * @since 0.3.0
 */
const slice = convertArrayMethod('slice', false)

export { slice }
