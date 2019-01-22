import { Path } from "./path";
import { PathParser } from "./pathParser";
import { isNil, toString } from "./utils";

const MAX_CACHE_SIZE = 1000;
const cache = new Map<string, Path>();

/**
 * Memoized version of {@link path.stringToPath}.<br />
 * The cache has a maximum size of 1000, when overflowing the cache is cleared.
 * @function
 * @param {string} str The string to convert
 * @returns {Array<Array<Symbol,*>>} The path represented as an array of keys
 * @memberof path
 * @private
 * @since 1.0.0
 */
const memoizedStringToPath = (str: string): Path => {
  if (cache.has(str)) {  return cache.get(str)!; }

  const path = PathParser.parse(str);

  if (cache.size === MAX_CACHE_SIZE) {  cache.clear(); }
  cache.set(str, path);

  return path;
};

/**
 * Converts <code>arg</code> to a path represented as an array of keys.<br />
 * <code>arg</code> may be a string, in which case it will be parsed.<br />
 * It may also be an Array, in which case a copy of the array with values converted to path keys will be returned.<br />
 * If <code>arg</code> is neither a string nor an Array, its string representation will be parsed.
 * @function
 * @param {*} arg The value to convert
 * @returns {Path} The path represented as an array of keys
 * @memberof path
 * @since 1.0.0
 * @example toPath('a.b[1]["."][1:-1]') // => [[prop, 'a'], [prop, 'b'], [index, 1], [prop, '.'], [slice, [1, -1]]]
 * @private
 */
const toPath = (arg: unknown): Path  => {
  if (isNil(arg)) {  return []; }

  return memoizedStringToPath(toString(arg));
};

export { toPath };
