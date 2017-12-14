import { convertArrayMethod } from './convertArrayMethod'

/**
 * Replaces by an array of elements <code>predicate</code> returns truthy for.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {function} [predicate] The function invoked per iteration.
 * @return {Object} Returns the updated object.
 * @example filter({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', v => v % 2) // => { nested: { prop: [1, 3] } }
 * @since 1.0.0
 * @flow
 */
const filter = convertArrayMethod('filter', false)

export { filter }
