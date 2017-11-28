import { convert } from 'core/convert'

/**
 * Replaces by an object assigning own enumerable string keyed properties of source objects to the destination object.<br />
 * Source objects are applied from left to right. Subsequent sources overwrite property assignments of previous sources.
 * @function
 * @memberof object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Object} [sources] The source objects.
 * @return {Object} Returns the updated object.
 * @example assign({ nested: { a: 1, b: 2 } }, 'nested', { b: 3, c: 4 }) // => { nested: { a:1, b: 3, c: 4 } }
 * @see {@link https://lodash.com/docs#assign|lodash.assign} for more information.
 * @since 0.1.12
 * @flow
 */
const assign = convert((obj, ...args) => Object.assign({ ...obj }, ...args))
export { assign }
