import { applyStringMethod } from './applyStringMethod'

/**
 * Replaces by a slice of former string starting at <code>beginIndex</code> and ending at <code>endIndex</code> or end of the string.<br/>
 * ⚠ Due to name conflicts, this function is named <code>stringSlice</code> when imported from top level (<code>import { stringSlice } from 'immutadot'</code>).
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} beginIndex Beginning index of slice.
 * @param {number?} endIndex Ending index of slice.
 * @return {Object} Returns the updated object.
 * @example slice({ nested: { a: 'Hello World !' } }, 6) // => { nested: { a: 'World !' } }
 * @example slice({ nested: { a: 'Hello World !' } }, 6, 11) // => { nested: { a: 'World' } }
 * @see {@link https://mdn.io/String.prototype.slice|String.prototype.slice} for more information.
 * @since 1.0.0
 */
const slice = applyStringMethod(String.prototype.slice, { arity: 1 })

export { slice }
