/**
 * Tests whether `arg` is a `undefined` or `null`.
 *
 * @remarks
 * Since 1.0.0
 *
 * @param arg The value to test
 * @returns `true` if `arg` is `undefined` or `null`, `false` otherwise
 */
export const isNil = (arg: unknown): arg is null | undefined => arg === undefined || arg === null;

/**
 * Converts `arg` to a string using string interpolation.
 *
 * @remarks
 * Since 1.0.0
 *
 * @param arg The value to convert
 * @returns The string representation of `arg`
 */
export const toString = (arg: unknown) => typeof arg === "string" ? arg : `${arg}`;

/**
 * This is an alias for {@link https://mdn.io/Number.isInteger | `Number.isInteger`}.
 *
 * @remarks
 * Since 1.0.0
 */
export const isIndex = (arg: unknown): arg is number =>
  // Number.isInteger actually accept anything, TypeScript lib is wrong here
  // so it is safe to assert that arg is a number
  Number.isInteger(arg as number);

/**
 * Strip slashes preceding occurences of <code>quote</code> from <code>str</code><br />
 * Possible quotes are <code>"</code> and <code>'</code>.
 *
 * @param str The string
 * @param quote The quote to unescape
 * @returns The unescaped string
 *
 * @remarks
 * Since 1.0.0
 */
export const unescapeQuotes = (str: string, quote: string) => str.replace(new RegExp(`\\\\${quote}`, "g"), quote);
