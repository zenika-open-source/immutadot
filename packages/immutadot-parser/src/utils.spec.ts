import {
  isNil,
  toString,
} from "./utils"

describe("Utils", () => {
  describe("util.isNil", () => {
    it("should return true for undefined and null", () => {
      expect(isNil(undefined)).toBe(true)
      expect(isNil(null)).toBe(true)
    })

    it("should return false for any other value than undefined and null", () => {
      expect(isNil(true)).toBe(false)
      expect(isNil({})).toBe(false)
      expect(isNil([])).toBe(false)
      expect(isNil("")).toBe(false)
      expect(isNil(.6)).toBe(false)
      expect(isNil("null")).toBe(false)
      expect(isNil("undefined")).toBe(false)
    })
  })

  describe("util.toString", () => {
    it("should return string representation", () => {
      expect(toString(undefined)).toBe("undefined")
      expect(toString(null)).toBe("null")
      expect(toString("🍺")).toBe("🍺")
      expect(toString(666)).toBe("666")
    })
  })
})
