import { convertArrayMethod } from './convertArrayMethod'

/**
 * Replaces by an array of values by running each element in the former collection thru callback.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {function} callback The function invoked per iteration.
 * @return {Object} Returns the updated object.
 * @example map({ nested: { prop: [1, 2, 3] } }, 'nested.prop', v => v * 2) // => { nested: { prop: [2, 4, 6] } }
 * @since 1.0.0
 * @flow
 */
const map = convertArrayMethod('map', false)

export { map }
