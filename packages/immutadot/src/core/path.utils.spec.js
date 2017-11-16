/* eslint-env jest */
import {
  getSliceBounds,
  isSlice,
  isSliceIndex,
} from './path.utils'

describe('Path Utils', () => {
  describe('GetSliceBounds', () => {
    it('should return actual slice bounds', () => {
      expect(getSliceBounds([undefined, undefined], 0)).toEqual([0, 0])
      expect(getSliceBounds([-2, -1], 0)).toEqual([0, 0])
      expect(getSliceBounds([1, 2], 0)).toEqual([1, 2])

      expect(getSliceBounds([undefined, undefined], 6)).toEqual([0, 6])
      expect(getSliceBounds([1, -1], 6)).toEqual([1, 5])
      expect(getSliceBounds([7, 8], 6)).toEqual([7, 8])
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
