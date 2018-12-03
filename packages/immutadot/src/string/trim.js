import { applyStringMethod } from './applyStringMethod'

/**
 * Replaces by former string stripped of whitespaces at start and end.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @return {Object} Returns the updated object.
 * @example trim({ nested: { a: '   Hello world !   ' } }) // => { nested: { a: 'Hello world !' } }
 * @see {@link https://mdn.io/String.prototype.trim|String.prototype.trim} for more information.
 * @since 1.0.0
 */
const trim = applyStringMethod(String.prototype.trim, { fixedArity: true })

export { trim }
