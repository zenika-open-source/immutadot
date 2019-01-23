import { Path } from "./path";
import { PathParser } from "./pathParser";
import { isNil, toString } from "./utils";

const MAX_CACHE_SIZE = 1000;
const cache = new Map<string, Path>();

/**
 * Memoized call to PathParser.parse().<br />
 * The cache has a maximum size of 1000, when overflowing the cache is cleared.
 *
 * @param {string} str The string to convert
 * @returns {Array<Array<Symbol,*>>} The path represented as an array of keys
 *
 * @remarks
 * Since 1.0.0
 */
const memoizedStringToPath = (str: string): Path => {
  if (cache.has(str)) {  return cache.get(str)!; }

  const path = PathParser.parse(str);

  if (cache.size === MAX_CACHE_SIZE) {  cache.clear(); }
  cache.set(str, path);

  return path;
};

/**
 * Converts `arg` to a path represented as an array of keys.<br />
 * If <code>arg</code> is not a string, its string representation will be parsed.
 *
 * @param {*} arg The value to convert
 * @returns {Path} The path represented as an array of keys
 *
 * @remarks
 * Since 1.0.0
 */
const toPath = (arg: unknown): Path  => {
  if (isNil(arg)) {  return []; }

  return memoizedStringToPath(toString(arg));
};

export { toPath };
