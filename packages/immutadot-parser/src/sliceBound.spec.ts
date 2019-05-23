import { SliceBound } from "./sliceBound"

describe("SliceBound.isValid", () => {
  it("should return true for any integer or undefined", () => {
    expect(SliceBound.isValid(0)).toBe(true)
    expect(SliceBound.isValid(1)).toBe(true)
    expect(SliceBound.isValid(6)).toBe(true)
    expect(SliceBound.isValid(100000000000)).toBe(true)
    expect(SliceBound.isValid(-1)).toBe(true)
    expect(SliceBound.isValid(-6)).toBe(true)
    expect(SliceBound.isValid(-100000000000)).toBe(true)
    expect(SliceBound.isValid(undefined)).toBe(true)
  })

  it("should return false for any non integer except undefined", () => {
    expect(SliceBound.isValid(null)).toBe(false)
    expect(SliceBound.isValid(true)).toBe(false)
    expect(SliceBound.isValid({})).toBe(false)
    expect(SliceBound.isValid([])).toBe(false)
    expect(SliceBound.isValid("")).toBe(false)
    expect(SliceBound.isValid(.6)).toBe(false)
  })
})
