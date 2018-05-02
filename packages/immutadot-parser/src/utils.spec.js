/* eslint-env jest */
import {
  isNil,
  isSliceIndex,
  toString,
} from './utils'

describe('Utils', () => {
  describe('util.isNil', () => {
    it('should return true for undefined and null', () => {
      expect(isNil(undefined)).toBe(true)
      expect(isNil(null)).toBe(true)
    })

    it('should return false for any other value than undefined and null', () => {
      expect(isNil(true)).toBe(false)
      expect(isNil({})).toBe(false)
      expect(isNil([])).toBe(false)
      expect(isNil('')).toBe(false)
      expect(isNil(.6)).toBe(false)
      expect(isNil('null')).toBe(false)
      expect(isNil('undefined')).toBe(false)
    })
  })

  describe('path.isSliceIndex', () => {
    it('should return true for any integer or undefined', () => {
      expect(isSliceIndex(0)).toBe(true)
      expect(isSliceIndex(1)).toBe(true)
      expect(isSliceIndex(6)).toBe(true)
      expect(isSliceIndex(100000000000)).toBe(true)
      expect(isSliceIndex(-1)).toBe(true)
      expect(isSliceIndex(-6)).toBe(true)
      expect(isSliceIndex(-100000000000)).toBe(true)
      expect(isSliceIndex(undefined)).toBe(true)
    })

    it('should return false for any non integer except undefined', () => {
      expect(isSliceIndex(null)).toBe(false)
      expect(isSliceIndex(true)).toBe(false)
      expect(isSliceIndex({})).toBe(false)
      expect(isSliceIndex([])).toBe(false)
      expect(isSliceIndex('')).toBe(false)
      expect(isSliceIndex(.6)).toBe(false)
    })
  })

  describe('util.toString', () => {
    it('should return string representation', () => {
      expect(toString()).toBe('undefined')
      expect(toString(null)).toBe('null')
      expect(toString('🍺')).toBe('🍺')
      expect(toString(666)).toBe('666')
    })
  })
})
