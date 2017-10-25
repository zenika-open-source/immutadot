/* eslint-env jest */
import {
  isIndex,
} from './path.utils'

describe('Path Utils', () => {
  describe('IsIndex', () => {
    it('should return true for any non negative integer', () => {
      expect(isIndex(0)).toBe(true)
      expect(isIndex(1)).toBe(true)
      expect(isIndex(6)).toBe(true)
      expect(isIndex(100000000000)).toBe(true)
    })

    it('should return false for any negative integer', () => {
      expect(isIndex(-1)).toBe(false)
      expect(isIndex(-6)).toBe(false)
      expect(isIndex(-100000000000)).toBe(false)
    })

    it('should return false for any non integer', () => {
      expect(isIndex(undefined)).toBe(false)
      expect(isIndex(null)).toBe(false)
      expect(isIndex(true)).toBe(false)
      expect(isIndex({})).toBe(false)
      expect(isIndex([])).toBe(false)
      expect(isIndex('')).toBe(false)
      expect(isIndex(.6)).toBe(false)
    })
  })
})
