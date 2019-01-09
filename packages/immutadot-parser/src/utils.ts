/**
 * Tests whether `arg` is a `undefined` or `null`.
 *
 * @remarks
 * Since 1.0.0
 *
 * @param arg The value to test
 * @returns `true` if `arg` is `undefined` or `null`, `false` otherwise
 */
const isNil = (arg: any) => arg === undefined || arg === null;

/**
 * Converts `arg` to a string using string interpolation.
 *
 * @remarks
 * Since 1.0.0
 *
 * @param arg The value to convert
 * @returns The string representation of `arg`
 */
const toString = (arg: any) => typeof arg === "string" ? arg : `${arg}`;

/**
 * This is an alias for {@link https://mdn.io/Number.isInteger | `Number.isInteger`}.
 *
 * @remarks
 * Since 1.0.0
 */
const isIndex = Number.isInteger;

/**
 * Tests whether `arg` is a valid slice index, that is an integer or `undefined`.
 *
 * @remarks
 * Since 1.0.0
 *
 * @param arg The value to test
 * @returns `true` if `arg` is a valid slice index, `false` otherwise
 */
const isSliceIndex = (arg: any) => arg === undefined || isIndex(arg);

export {
  isIndex,
  isNil,
  isSliceIndex,
  toString,
};
