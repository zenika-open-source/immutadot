import { isSliceIndex } from "./sliceIndex";

describe("path.isSliceIndex", () => {
  it("should return true for any integer or undefined", () => {
    expect(isSliceIndex(0)).toBe(true);
    expect(isSliceIndex(1)).toBe(true);
    expect(isSliceIndex(6)).toBe(true);
    expect(isSliceIndex(100000000000)).toBe(true);
    expect(isSliceIndex(-1)).toBe(true);
    expect(isSliceIndex(-6)).toBe(true);
    expect(isSliceIndex(-100000000000)).toBe(true);
    expect(isSliceIndex(undefined)).toBe(true);
  });

  it("should return false for any non integer except undefined", () => {
    expect(isSliceIndex(null)).toBe(false);
    expect(isSliceIndex(true)).toBe(false);
    expect(isSliceIndex({})).toBe(false);
    expect(isSliceIndex([])).toBe(false);
    expect(isSliceIndex("")).toBe(false);
    expect(isSliceIndex(.6)).toBe(false);
  });
});
