import { isSliceBound } from "./sliceBound"

describe("path.isSliceBound", () => {
  it("should return true for any integer or undefined", () => {
    expect(isSliceBound(0)).toBe(true)
    expect(isSliceBound(1)).toBe(true)
    expect(isSliceBound(6)).toBe(true)
    expect(isSliceBound(100000000000)).toBe(true)
    expect(isSliceBound(-1)).toBe(true)
    expect(isSliceBound(-6)).toBe(true)
    expect(isSliceBound(-100000000000)).toBe(true)
    expect(isSliceBound(undefined)).toBe(true)
  })

  it("should return false for any non integer except undefined", () => {
    expect(isSliceBound(null)).toBe(false)
    expect(isSliceBound(true)).toBe(false)
    expect(isSliceBound({})).toBe(false)
    expect(isSliceBound([])).toBe(false)
    expect(isSliceBound("")).toBe(false)
    expect(isSliceBound(.6)).toBe(false)
  })
})
