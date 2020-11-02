import { applyStringMethod } from './applyStringMethod'

/**
 * Replaces by former string stripped of whitespaces at start.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @return {Object} Returns the updated object.
 * @example trimStart({ nested: { a: '   Hello world !   ' } }) // => { nested: { a: 'Hello world !   ' } }
 * @see {@link https://mdn.io/String.prototype.trimStart|String.prototype.trimStart} for more information.
 * @since 1.0.0
 */
const trimStart = applyStringMethod(String.prototype.trimStart, { fixedArity: true })

export { trimStart, trimStart as trimLeft }
