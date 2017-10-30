/* eslint-env jest */
import {
  isIndex,
  isSlice,
  isSliceIndex,
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

  describe('IsSliceIndex', () => {
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

  describe('IsSlice', () => {
    it('should return true for any array containing 2 slice indexes', () => {
      expect(isSlice([0, 6])).toBe(true)
      expect(isSlice([-6, -1])).toBe(true)
      expect(isSlice([undefined, 1000000000])).toBe(true)
      expect(isSlice([-1, undefined])).toBe(true)
      expect(isSlice([undefined, undefined])).toBe(true)
    })

    it('should return false for any non array', () => {
      expect(isSlice(null)).toBe(false)
      expect(isSlice(true)).toBe(false)
      expect(isSlice({})).toBe(false)
      expect(isSlice('')).toBe(false)
      expect(isSlice(6)).toBe(false)
    })

    it('should return false for any array with length != 2', () => {
      expect(isSlice([])).toBe(false)
      expect(isSlice([1])).toBe(false)
      expect(isSlice([0, 1, 2])).toBe(false)
      expect(isSlice(Array(10))).toBe(false)
    })

    it('should return false for any array containing non slice indexes', () => {
      expect(isSlice([0, ''])).toBe(false)
      expect(isSlice(['', 0])).toBe(false)
      expect(isSlice([0, null])).toBe(false)
      expect(isSlice([0, []])).toBe(false)
      expect(isSlice([0, {}])).toBe(false)
      expect(isSlice([0, ''])).toBe(false)
    })
  })
})
