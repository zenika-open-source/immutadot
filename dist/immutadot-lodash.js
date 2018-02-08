(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash'), require('immutadot'), require('lodash/fp')) :
	typeof define === 'function' && define.amd ? define(['exports', 'lodash', 'immutadot', 'lodash/fp'], factory) :
	(factory((global.immutadotLodash = {}),global._,global.immutadot,global._.fp));
}(this, (function (exports,lodash,immutadot,fp) { 'use strict';

/**
 * Replaces an array removing values in the other given arrays from the former array.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Array} values The arrays of values to exclude.
 * @return {Object} Returns the updated object.
 * @example difference({ nested: { prop: [1, 2] } }, 'nested.prop', [2, 3]) // => { nested: { prop: [1] } }
 * @see {@link https://lodash.com/docs#difference|lodash.difference} for more information.
 * @since 1.0.0
 */
var difference = immutadot.convert(lodash.difference);

/**
 * This method is like {@link array.difference} except that it uses <code>iteratee</code> to generate the value to be compared for each element.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Array} values The arrays of values to exclude.
 * @param {Function} [iteratee={@link https://lodash.com/docs#identity|lodash.identity}] The iteratee invoked per element.
 * @return {Object} Returns the updated object.
 * @example differenceBy({ nested: { prop: [1.2, 3.4, 5.6] } }, 'nested.prop', [5.4, 2.1], Math.floor) // => { nested: { prop: [1.2, 3.4] } }
 * @see {@link https://lodash.com/docs#differenceBy|lodash.differenceBy} for more information.
 * @since 1.0.0
 */
var differenceBy = immutadot.convert(lodash.differenceBy);

/**
 * This method is like {@link array.difference} except that it uses <code>comparator</code> to compare elements of the former array to <code>values</code>.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Array} values The arrays of values to exclude.
 * @param {Function} [comparator] The comparator invoked per element.
 * @return {Object} Returns the updated object.
 * @example differenceWith({ nested: { prop: [{ x: 1 }, { x: 2 }] } }, 'nested.prop', [{ x: 2 }, { x: 3 }], (a, b) => a.x === b.x) // => { nested: { prop: [{ x: 1 }] } }
 * @see {@link https://lodash.com/docs#differenceWith|lodash.differenceWith} for more information.
 * @since 1.0.0
 */
var differenceWith = immutadot.convert(lodash.differenceWith);

/**
 * Replaces an array dropping one or several elements at the start of the former array.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} [n=1] The number of elements to drop.
 * @return {Object} Returns the updated object.
 * @example drop({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', 2) // => { nested: { prop: [3, 4] } }
 * @see {@link https://lodash.com/docs#drop|lodash.drop} for more information.
 * @since 1.0.0
 */
var drop = immutadot.convert(lodash.drop);

/**
 * Replaces an array dropping one or several elements at the end of the former array.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} [n=1] The number of elements to drop.
 * @return {Object} Returns the updated object.
 * @example dropRight({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', 2) // => { nested: { prop: [1, 2] } }
 * @see {@link https://lodash.com/docs#dropRight|lodash.dropRight} for more information.
 * @since 1.0.0
 */
var dropRight = immutadot.convert(lodash.dropRight);

/**
 * Replaces an array excluding elements dropped from the end. Elements are dropped until <code>predicate</code> returns falsey.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {Function} [predicate={@link https://lodash.com/docs#identity|lodash.identity}] The function invoked per iteration.
 * @return {Object} Returns the updated object.
 * @example dropRightWhile({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', v => v > 2) // => { nested: { prop: [1, 2] } }
 * @see {@link https://lodash.com/docs#dropRightWhile|lodash.dropRightWhile} for more information.
 * @since 1.0.0
 */
var dropRightWhile = immutadot.convert(lodash.dropRightWhile);

/**
 * Replaces an array excluding elements dropped from the beginning. Elements are dropped until <code>predicate</code> returns falsey.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {Function} [predicate={@link https://lodash.com/docs#identity|lodash.identity}] The function invoked per iteration.
 * @return {Object} Returns the updated object.
 * @example dropWhile({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', v => v < 3) // => { nested: { prop: [3, 4] } }
 * @see {@link https://lodash.com/docs#dropWhile|lodash.dropWhile} for more information.
 * @since 1.0.0
 */
var dropWhile = immutadot.convert(lodash.dropWhile);

/**
 * Replaces by an array of unique values that are included in th former array and all given arrays.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Array} [arrays] The arrays to inspect.
 * @return {Object} Returns the updated object.
 * @example intersection({ nested: { prop: [1, 2] } }, 'nested.prop', [2, 3]) // => { nested: { prop: [2] } }
 * @see {@link https://lodash.com/docs#intersection|lodash.intersection} for more information.
 * @since 1.0.0
 */
var intersection = immutadot.convert(lodash.intersection);

/**
 * This method is like {@link array.intersection} except that it uses <code>iteratee</code> to generate the value to be compared for each element.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} [iteratee={@link https://lodash.com/docs#identity|lodash.identity}] The iteratee invoked per element.
 * @return {Object} Returns the updated object.
 * @example intersectionBy({ nested: { prop: [1.2, 2.1] } }, 'nested.prop', [2.3, 3.2], Math.floor) // => { nested: { prop: [2.1] } }
 * @see {@link https://lodash.com/docs#intersectionBy|lodash.intersectionBy} for more information.
 * @since 1.0.0
 */
var intersectionBy = immutadot.convert(lodash.intersectionBy);

/**
 * This method is like {@link array.intersection} except that it uses <code>comparator</code> to compare elements of the former array to <code>arrays</code>.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} [comparator] The comparator invoked per element.
 * @return {Object} Returns the updated object.
 * @example intersectionWith({ nested: { prop: [{ x: 1 }, { x: 2 }] } }, 'nested.prop', [{ x: 2 }, { x: 3 }], (a, b) => a.x === b.x) // => { nested: { prop: [{ x: 2 }] } }
 * @see {@link https://lodash.com/docs#intersectionWith|lodash.intersectionWith} for more information.
 * @since 1.0.0
 */
var intersectionWith = immutadot.convert(lodash.intersectionWith);

var lodashFpConvertOptions = {
  curry: false,
  fixed: false,
  rearg: false

  /**
   * Converts a lodash/fp function with options <code>{ rearg: false, curry: false }</code>.
   * @memberof util
   * @param {function} fn The lodash/fp function.
   * @return {function} Returns the converted lodash/fp function.
   * @since 0.2.0
   * @private
   */
};var lodashFpConvert = function lodashFpConvert(fn) {
  return fn.convert(lodashFpConvertOptions);
};

/**
 * Converts and wraps a lodash/fp function.
 * @memberof util
 * @param {function} fn The lodash/fp function.
 * @return {function} Returns the wrapped function.
 * @see {@link util.convert|convert} for more information.
 * @since 0.2.0
 * @private
 */
var convertLodashFp = function convertLodashFp(fn) {
  return immutadot.convert(lodashFpConvert(fn));
};

/**
 * Replaces an array removing all given values from the former array.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...*} values The values to remove.
 * @return {Object} Returns the updated object.
 * @example pull({ nested: { prop: [1, 2, 3, 1, 2, 3] } }, 'nested.prop', 1, 3) // => { nested: { prop: [2, 2] } }
 * @see {@link https://lodash.com/docs#pull|lodash.pull} for more information.
 * @since 1.0.0
 */
var pull = convertLodashFp(fp.pull);

/**
 * This method is like {@link array.pull} except that it accepts an array of values to remove.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {Array} values The values to remove.
 * @return {Object} Returns the updated object.
 * @example pullAll({ nested: { prop: [1, 2, 3, 1, 2, 3] } }, 'nested.prop', [1, 3]) // => { nested: { prop: [2, 2] } }
 * @see {@link https://lodash.com/docs#pullAll|lodash.pullAll} for more information.
 * @since 1.0.0
 */
var pullAll = convertLodashFp(fp.pullAll);

/**
 * This method is like {@link array.pullAll} except that it accepts <code>iteratee</code> to generate the criterion by which each element is compared.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {Array} values The values to remove.
 * @param {Function} [iteratee={@link https://lodash.com/docs#identity|lodash.identity}] The iteratee invoked per element.
 * @return {Object} Returns the updated object.
 * @example pullAllBy({ nested: { prop: [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }, { x: 2 }, { x: 3 }] } }, 'nested.prop', [{ x: 1 }, { x: 3 }], 'x') // => { nested: { prop: [{ x: 2 }, { x: 2 }] } }
 * @see {@link https://lodash.com/docs#pullAllBy|lodash.pullAllBy} for more information.
 * @since 1.0.0
 */
var pullAllBy = convertLodashFp(fp.pullAllBy);

/**
 * This method is like {@link array.pullAll} except that it accepts <code>comparator</code> to compare elements.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {Array} values The values to remove.
 * @param {Function} [comparator] The comparator invoked per element.
 * @return {Object} Returns the updated object.
 * @example pullAllWith({ nested: { prop: [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }, { x: 2 }, { x: 3 }] } }, 'nested.prop', [{ x: 1 }, { x: 3 }], (a, b) => a.x === b.x) // => { nested: { prop: [{ x: 2 }, { x: 2 }] } }
 * @see {@link https://lodash.com/docs#pullAllWith|lodash.pullAllWith} for more information.
 * @since 1.0.0
 */
var pullAllWith = convertLodashFp(fp.pullAllWith);

/**
 * Replaces an array removing the specified indexes from the former array.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...(number|number[])} [indexes] The indexes of elements to remove.
 * @return {Object} Returns the updated object.
 * @example pullAt({ nested: { prop: [4, 3, 2, 1] } }, 'nested.prop', 1, 3) // => { nested: { prop: [4, 2] } }
 * @see {@link https://lodash.com/docs#pullAt|lodash.pullAt} for more information.
 * @since 1.0.0
 */
var pullAt = convertLodashFp(fp.pullAt);

/**
 * Replaces an array removing elements that predicate returns truthy for from the former array.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {Function} [predicate={@link https://lodash.com/docs#identity|lodash.identity}] The function invoked per iteration.
 * @return {Object} Returns the updated object.
 * @example remove({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', v => v > 2) // => { nested: { prop: [1, 2] } }
 * @see {@link https://lodash.com/docs#remove|lodash.remove} for more information.
 * @since 1.0.0
 */
var remove = convertLodashFp(fp.remove);

/**
 * Creates a slice of array with <code>n</code> elements taken from the beginning.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} [n=1] Number of elements to take from the beginning of the array.
 * @return {Object} Returns the updated object.
 * @example take({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', 2) // => { nested: { prop: [1, 2] } }
 * @see {@link https://lodash.com/docs#take|lodash.take} for more information.
 * @since 1.0.0
 */
var take = immutadot.convert(lodash.take);

/**
 * Creates a slice of array with <code>n</code> elements taken from the end.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} [n=1] Number of elements to take from the end of the array.
 * @return {Object} Returns the updated object.
 * @example takeRight({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', 2) // => { nested: { prop: [3, 4] } }
 * @see {@link https://lodash.com/docs#takeRight|lodash.takeRight} for more information.
 * @since 1.0.0
 */
var takeRight = immutadot.convert(lodash.takeRight);

/**
 * Creates a slice of array with elements taken from the end.
 * Elements are taken until predicate returns falsey.
 * The predicate is invoked with three arguments: (value, index, array).
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {Function} [predicate={@link https://lodash.com/docs#identity|lodash.identity}] The function invoked per iteration.
 * @return {Object} Returns the updated object.
 * @example takeRightWhile({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', v => v > 3) // => { nested: { prop: [4] } }
 * @see {@link https://lodash.com/docs#takeRightWhile|lodash.takeRightWhile} for more information.
 * @since 1.0.0
 */
var takeRightWhile = immutadot.convert(lodash.takeRightWhile);

/**
 * Creates a slice of array with elements taken from the beginning.
 * Elements are taken until predicate returns falsey.
 * The predicate is invoked with three arguments: (value, index, array).
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {Function} [predicate={@link https://lodash.com/docs#identity|lodash.identity}] The function invoked per iteration.
 * @return {Object} Returns the updated object.
 * @example takeWhile({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', v => v < 2) // => { nested: { prop: [1] } }
 * @see {@link https://lodash.com/docs#takeWhile|lodash.takeWhile} for more information.
 * @since 1.0.0
 */
var takeWhile = immutadot.convert(lodash.takeWhile);

/**
 * Replaces an array by an array of unique values, in order, from the former array and the given arrays.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Array} [arrays] The arrays to inspect.
 * @return {Object} Returns the updated object.
 * @example union({ nested: { prop: [1, 2] } }, 'nested.prop', [2, 3]) // => { nested: { prop: [1, 2, 3] } }
 * @see {@link https://lodash.com/docs#union|lodash.union} for more information.
 * @since 1.0.0
 */
var union = immutadot.convert(lodash.union);

/**
 * This method is like {@link array.union} except that it accepts <code>iteratee</code> to generate the criterion by which elements are compared.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} [iteratee={@link https://lodash.com/docs#identity|lodash.identity}] The iteratee invoked per element.
 * @return {Object} Returns the updated object.
 * @example unionBy({ nested: { prop: [{ x: 1 }, { x: 2 }] } }, 'nested.prop', [{ x: 2 }, { x: 3 }], 'x') // => { nested: { prop: [{ x: 1 }, { x: 2 }, { x: 3 }] } }
 * @see {@link https://lodash.com/docs#unionBy|lodash.unionBy} for more information.
 * @since 1.0.0
 */
var unionBy = immutadot.convert(lodash.unionBy);

/**
 * This method is like {@link array.union} except that it accepts <code>comparator</code> to compare elements.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} [comparator] The comparator invoked per element.
 * @return {Object} Returns the updated object.
 * @example unionWith({ nested: { prop: [{ x: 1 }, { x: 2 }] } }, 'nested.prop', [{ x: 2 }, { x: 3 }], (a, b) => a.x === b.x) // => { nested: { prop: [{ x: 1 }, { x: 2 }, { x: 3 }] } }
 * @see {@link https://lodash.com/docs#unionWith|lodash.unionWith} for more information.
 * @since 1.0.0
 */
var unionWith = immutadot.convert(lodash.unionWith);

/**
 * This method is an alias of {@link array.pull}.
 * @function
 * @memberof array
 * @since 1.0.0
 */
var without = pull;

/**
 * Replaces an array by the symmetric difference of the former array and the given arrays.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Array} arrays The arrays to inspect.
 * @return {Object} Returns the updated object.
 * @example xor({ nested: { prop: [1, 2] } }, 'nested.prop', [2, 3]) // => { nested: { prop: [1, 3] } }
 * @see {@link https://lodash.com/docs#xor|lodash.xor} for more information.
 * @since 1.0.0
 */
var xor = immutadot.convert(lodash.xor);

/**
 * This method is like {@link array.xor} except that it accepts <code>iteratee</code> to generate the criterion by which elements are compared.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Array} arrays The arrays to inspect.
 * @param {Function} [iteratee={@link https://lodash.com/docs#identity|lodash.identity}] The iteratee invoked per element.
 * @return {Object} Returns the updated object.
 * @example xorBy({ nested: { prop: [{ x: 1 }, { x: 2 }] } }, 'nested.prop', [{ x: 2 }, { x: 3 }], 'x') // => { nested: { prop: [{ x: 1 }, { x: 3 }] } }
 * @see {@link https://lodash.com/docs#xorBy|lodash.xorBy} for more information.
 * @since 1.0.0
 */
var xorBy = immutadot.convert(lodash.xorBy);

/**
 * This method is like {@link array.xor} except that it accepts <code>comparator</code> to compare elements.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Array} arrays The arrays to inspect.
 * @param {Function} [comparator] The comparator invoked per element.
 * @return {Object} Returns the updated object.
 * @example xorWith({ nested: { prop: [{ x: 1 }, { x: 2 }] } }, 'nested.prop', [{ x: 2 }, { x: 3 }], (a, b) => a.x === a.b) // => { nested: { prop: [{ x: 1 }, { x: 3 }] } }
 * @see {@link https://lodash.com/docs#xorWith|lodash.xorWith} for more information.
 * @since 1.0.0
 */
var xorWith = immutadot.convert(lodash.xorWith);

/**
 * Replaces by an array of elements <code>predicate</code> returns truthy for.
 * @function
 * @memberof collection
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {function} [predicate={@link https://lodash.com/docs#identity|lodash.identity}] The function invoked per iteration.
 * @return {Object} Returns the updated object.
 * @see {@link https://lodash.com/docs#filter|lodash.filter} for more information.
 * @example filter({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', v => v % 2) // => { nested: { prop: [1, 3] } }
 * @since 1.0.0
 */
var filter = immutadot.convert(lodash.filter);

/**
 * Replaces by an array of values by running each element in the former collection thru iteratee.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * @function
 * @memberof collection
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {function} [iteratee={@link https://lodash.com/docs#identity|lodash.identity}] The function invoked per iteration.
 * @return {Object} Returns the updated object.
 * @see {@link https://lodash.com/docs#map|lodash.map} for more information.
 * @example map({ nested: { prop: [1, 2, 3] } }, 'nested.prop', v => v * 2) // => { nested: { prop: [2, 4, 6] } }
 * @since 1.0.0
 */
var map = immutadot.convert(lodash.map);

/**
 * Replaces by an array of sorted by <code>iteratees</code> in specified <code>orders</code>.
 * @function
 * @memberof collection
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[{@link https://lodash.com/docs#identity|lodash.identity}]] The iteratees to sort by.
 * @param {string[]} [orders] The sort orders of <code>iteratees</code>.
 * @return {Object} Returns the updated object.
 * @see {@link https://lodash.com/docs#orderBy|lodash.orderBy} for more information.
 * @example
 * orderBy({ nested: { prop: [{ name: 'Yvo', age: 2 }, { name: 'Nico', age: 666 }, { name: 'Nico', age: 30 }] } }, 'nested.prop', ['name', 'age'], ['asc', 'desc'])
 * // => { nested: { prop: [{ name: 'Nico', age: 666 }, { name: 'Nico', age: 30 }, { name: 'Yvo', age: 2 }] } }
 * @since 1.0.0
 */
var orderBy = immutadot.convert(lodash.orderBy);

/**
 * Replaces by an array of elements <code>predicate</code> returns falsy for.
 * @function
 * @memberof collection
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {function} [predicate={@link https://lodash.com/docs#identity|lodash.identity}] The function invoked per iteration.
 * @return {Object} Returns the updated object.
 * @see {@link https://lodash.com/docs#reject|lodash.reject} for more information.
 * @example reject({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', v => v % 2) // => { nested: { prop: [2, 4] } }
 * @since 1.0.0
 */
var reject = immutadot.convert(lodash.reject);

/**
 * Replaces by an array of shuffled elements.
 * @function
 * @memberof collection
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @return {Object} Returns the updated object.
 * @see {@link https://lodash.com/docs#shuffle|lodash.shuffle} for more information.
 * @example shuffle({ nested: { prop: [1, 2, 3, 4, 5, 6, 7, 8, 9] } }, 'nested.prop') // => { nested: { prop: [7, 3, 9, 1, 4, 5, 6, 8, 2] } }
 * @since 1.0.0
 */
var shuffle = immutadot.convert(lodash.shuffle);

/**
 * Replaces by an array of sorted by <code>iteratees</code>.
 * @function
 * @memberof collection
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[{@link https://lodash.com/docs#identity|lodash.identity}]] The iteratees to sort by.
 * @return {Object} Returns the updated object.
 * @see {@link https://lodash.com/docs#sortBy|lodash.sortBy} for more information.
 * @example
 * sortBy({ nested: { prop: [{ name: 'Yvo', age: 2 }, { name: 'Nico', age: 666 }, { name: 'Nico', age: 30 }] } }, 'nested.prop', ['name', 'age'])
 * // => { nested: { prop: [{ name: 'Nico', age: 30 }, { name: 'Nico', age: 666 }, { name: 'Yvo', age: 2 }] } }
 * @since 1.0.0
 */
var sortBy = immutadot.convert(lodash.sortBy);

/**
 * Replaces by an object assigning own and inherited enumerable string keyed properties of source objects to the destination object for all destination properties that resolve to <code>undefined</code>.<br >
 * Source objects are applied from left to right. Once a property is set, additional values of the same property are ignored.
 * @function
 * @memberof object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Object} [sources] The source objects.
 * @return {Object} Returns the updated object.
 * @example defaults({ nested: { a: 1, b: 2 } }, 'nested', { b: 3, c: 4 }) // => { nested: { a:1, b: 2, c: 4 } }
 * @see {@link https://lodash.com/docs#defaults|lodash.defaults} for more information.
 * @since 1.0.0
 */
var defaults = convertLodashFp(fp.defaults);

/**
 * Replaces by an object with the same values as the former object and values generated by running each own enumerable string keyed property of the former object thru <code>iteratee</code>.
 * The iteratee is invoked with three arguments: (value, key, object).
 * @function
 * @memberof object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {function} [iteratee={@link https://lodash.com/docs#identity|lodash.identity}] The function invoked per iteration.
 * @return {Object} Returns the updated object.
 * @example mapKeys({ nested: { a: 1, b: 2, c: 3 } }, 'nested', (v, k) => '_' + k) // => { nested: { _a: 1, _b: 2, _c: 3 } }
 * @see {@link https://lodash.com/docs#mapKeys|lodash.mapKeys} for more information.
 * @since 1.0.0
 */
var mapKeys = immutadot.convert(lodash.mapKeys);

/**
 * Replaces by an object with the same keys as the former object and values generated by running each own enumerable string keyed property of object thru <code>iteratee</code>.
 * The iteratee is invoked with three arguments: (value, key, object).
 * @function
 * @memberof object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {function} [iteratee={@link https://lodash.com/docs#identity|lodash.identity}] The function invoked per iteration.
 * @return {Object} Returns the updated object.
 * @example mapValues({ nested: { a: 1, b: 2, c: 3 } }, 'nested', v => v * v) // => { nested: { a: 1, b: 4, c: 9 } }
 * @example mapValues({ nested: { a: { age: 40, name: 'John' }, b: { age: 30, name: 'Alice' } } }, 'nested', 'age') // => { nested: { a: 40, b: 30 } }
 * @see {@link https://lodash.com/docs#mapValues|lodash.mapValues} for more information.
 * @since 1.0.0
 */
var mapValues = immutadot.convert(lodash.mapValues);

/**
 * Replaces by an object deeply merging own enumerable string keyed properties of source objects to the former object.<br />
 * Source objects are applied from left to right. Subsequent sources overwrite properties of previous sources.
 * @function
 * @memberof object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Object} [sources] The source objects.
 * @return {Object} Returns the updated object.
 * @example merge({ nested: { prop: { a: 1 } } }, 'nested', { prop: { a: 2, b: 3 } }) // => { nested: { prop: { a: 2, b: 3 } } }
 * @see {@link https://lodash.com/docs#merge|lodash.merge} for more information.
 * @since 1.0.0
 */
var merge = convertLodashFp(fp.merge);

/**
 * Replaces by an object omitting specified properties.
 * @function
 * @memberof object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...(string|string[])} [paths] The property paths to omit.
 * @return {Object} Returns the updated object.
 * @example omit({ nested: { a: 1, b: 2, c: 3 } }, 'nested', 'b') // => { nested: { a:1, c: 3 } }
 * @see {@link https://lodash.com/docs#omit|lodash.omit} for more information.
 * @since 1.0.0
 */
var omit = immutadot.convert(lodash.omit);

/**
 * Replaces by an object omitting properties that <code>predicate</code> doesn't return truthy for.
 * @function
 * @memberof object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {function} [predicate={@link https://lodash.com/docs#identity|lodash.identity}] The function invoked per property.
 * @return {Object} Returns the updated object.
 * @example omitBy({ nested: { a: 1, b: 2, c: 3 } }, 'nested', v => v === 2) // => { nested: { a:1, c: 3 } }
 * @see {@link https://lodash.com/docs#omitBy|lodash.omitBy} for more information.
 * @since 1.0.0
 */
var omitBy = immutadot.convert(lodash.omitBy);

/**
 * Replaces by an object picking specified properties.
 * @function
 * @memberof object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @return {Object} Returns the updated object.
 * @example pick({ nested: { a: 1, b: 2, c: 3 } }, 'nested', 'b') // => { nested: { b: 2 } }
 * @see {@link https://lodash.com/docs#pick|lodash.pick} for more information.
 * @since 1.0.0
 */
var pick = immutadot.convert(lodash.pick);

/**
 * Replaces by an object picking properties that <code>predicate</code> returns truthy for.
 * @function
 * @memberof object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {function} [predicate={@link https://lodash.com/docs#identity|lodash.identity}] The function invoked per iteration.
 * @return {Object} Returns the updated object.
 * @example pickBy({ nested: { a: 1, b: 2, c: 3, d: 4 } }, 'nested', v => v < 3) // => { nested: { a: 1, b: 2 } }
 * @see {@link https://lodash.com/docs#pickBy|lodash.pickBy} for more information.
 * @since 1.0.0
 */
var pickBy = immutadot.convert(lodash.pickBy);

/**
 * Converts the first character of string to upper case and the remaining to lower case.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @return {Object} Returns the updated object.
 * @example capitalize({ nested: { a: "a string" } }, 'nested.a') // => { nested: { a: "A string" } }
 * @see {@link https://lodash.com/docs#capitalize|lodash.capitalize} for more information.
 * @since 1.0.0
 */
var capitalize = immutadot.convert(lodash.capitalize);

/**
 * Converts string, as a whole, to lower case just like String#toLowerCase.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @return {Object} Returns the updated object.
 * @example toLower({ nested: { a: "A STRING" } }, 'nested.a') // => { nested: { a: "a string" } }
 * @see {@link https://lodash.com/docs#toLower|lodash.toLower} for more information.
 * @see {@link https://mdn.io/String/toLowerCase|String.toLowerCase} for more information.
 * @since 1.0.0
 */
var toLower = immutadot.convert(lodash.toLower);

/**
 * Converts string, as a whole, to upper case just like String#toUpperCase.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @return {Object} Returns the updated object.
 * @example toUpper({ nested: { a: "a string" } }, 'nested.a') // => { nested: { a: "A STRING" } }
 * @see {@link https://lodash.com/docs#toUpper|lodash.toUpper} for more information.
 * @see {@link https://mdn.io/String/toUpperCase|String.toUpperCase} for more information.
 * @since 1.0.0
 */
var toUpper = immutadot.convert(lodash.toUpper);

exports.difference = difference;
exports.differenceBy = differenceBy;
exports.differenceWith = differenceWith;
exports.drop = drop;
exports.dropRight = dropRight;
exports.dropRightWhile = dropRightWhile;
exports.dropWhile = dropWhile;
exports.intersection = intersection;
exports.intersectionBy = intersectionBy;
exports.intersectionWith = intersectionWith;
exports.pull = pull;
exports.pullAll = pullAll;
exports.pullAllBy = pullAllBy;
exports.pullAllWith = pullAllWith;
exports.pullAt = pullAt;
exports.remove = remove;
exports.take = take;
exports.takeRight = takeRight;
exports.takeRightWhile = takeRightWhile;
exports.takeWhile = takeWhile;
exports.union = union;
exports.unionBy = unionBy;
exports.unionWith = unionWith;
exports.without = without;
exports.xor = xor;
exports.xorBy = xorBy;
exports.xorWith = xorWith;
exports.filter = filter;
exports.map = map;
exports.orderBy = orderBy;
exports.reject = reject;
exports.shuffle = shuffle;
exports.sortBy = sortBy;
exports.defaults = defaults;
exports.mapKeys = mapKeys;
exports.mapValues = mapValues;
exports.merge = merge;
exports.omit = omit;
exports.omitBy = omitBy;
exports.pick = pick;
exports.pickBy = pickBy;
exports.capitalize = capitalize;
exports.toLower = toLower;
exports.toUpper = toUpper;

Object.defineProperty(exports, '__esModule', { value: true });

})));
