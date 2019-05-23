import { SliceBound } from "./sliceBound"

export type SliceStep = SliceBound

export const isValid = (arg: any): arg is SliceStep => SliceBound.isValid(arg) && arg !== 0

export const isValidString = (arg: any) => isValid(arg ? Number(arg) : undefined)

export const fromString = (str: string): SliceStep => SliceBound.fromString(str)

export const SliceStep = {
  fromString,
  isValid,
  isValidString,
}
