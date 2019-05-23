import { isIndex } from "./utils"

export type SliceBound = number | undefined

/**
 * Tests whether `arg` is a valid slice index, that is an integer or `undefined`.
 *
 * @param arg The value to test
 * @returns `true` if `arg` is a valid slice index, `false` otherwise
 *
 * @remarks
 * Since 1.0.0
 */
export const isValid = (arg: any): arg is SliceBound => arg === undefined || isIndex(arg)

/**
 * Tests whether <code>arg</code> is a valid slice index once converted to a number.
 *
 * @param arg The value to test
 * @returns True if <code>arg</code> is a valid slice index once converted to a number, false otherwise.
 *
 * @remarks
 * Since 1.0.0
 */
export const isValidString = (arg: any) => isValid(arg ? Number(arg) : undefined)

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
export const fromString = (str: string): SliceBound =>
  str === undefined || str === "" ? undefined : Number(str)

export const SliceBound = {
  fromString,
  isValid,
  isValidString,
}
