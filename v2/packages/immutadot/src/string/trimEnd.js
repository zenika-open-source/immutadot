import { applyStringMethod } from './applyStringMethod'

/**
 * Replaces by former string stripped of whitespaces at end.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @return {Object} Returns the updated object.
 * @example trimEnd({ nested: { a: '   Hello world !   ' } }) // => { nested: { a: '   Hello world !' } }
 * @see {@link https://mdn.io/String.prototype.trimEnd|String.prototype.trimEnd} for more information.
 * @since 1.0.0
 */
const trimEnd = applyStringMethod(String.prototype.trimEnd, { fixedArity: true })

export { trimEnd, trimEnd as trimRight }
