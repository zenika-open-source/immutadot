/**
 * Tests whether `arg` is a `undefined` or `null`.
 *
 * @remarks
 * Since 1.0.0
 *
 * @param arg The value to test
 * @returns `true` if `arg` is `undefined` or `null`, `false` otherwise
 */
export const isNil = (arg: any) => arg === undefined || arg === null;

/**
 * Converts `arg` to a string using string interpolation.
 *
 * @remarks
 * Since 1.0.0
 *
 * @param arg The value to convert
 * @returns The string representation of `arg`
 */
export const toString = (arg: any) => typeof arg === "string" ? arg : `${arg}`;

/**
 * This is an alias for {@link https://mdn.io/Number.isInteger | `Number.isInteger`}.
 *
 * @remarks
 * Since 1.0.0
 */
export const isIndex = Number.isInteger;

export type SliceIndex = number | undefined;

/**
 * Tests whether `arg` is a valid slice index, that is an integer or `undefined`.
 *
 * @remarks
 * Since 1.0.0
 *
 * @param arg The value to test
 * @returns `true` if `arg` is a valid slice index, `false` otherwise
 */
export const isSliceIndex = (arg: any): arg is SliceIndex => arg === undefined || isIndex(arg);

/**
 * Converts <code>str</code> to a slice index.
 *
 * @param str The string to convert
 * @param defaultValue The default value if <code>str</code> is empty
 * @returns <code>undefined</code> if <code>str</code> is empty, otherwise an int (may be NaN)
 *
 * @remarks
 * Since 1.0.0
 */
export const toSliceIndex = (str: string, defaultValue: SliceIndex = undefined) =>
  str === "" ? defaultValue : Number(str);

/**
 * Tests whether <code>arg</code> is a valid slice index once converted to a number.
 *
 * @param arg The value to test
 * @returns True if <code>arg</code> is a valid slice index once converted to a number, false otherwise.
 *
 * @remarks
 * Since 1.0.0
 */
export const isSliceIndexString = (arg: any) => isSliceIndex(arg ? Number(arg) : undefined);
