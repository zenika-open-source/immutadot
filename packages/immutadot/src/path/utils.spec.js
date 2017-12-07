/* eslint-env jest */
import {
  getSliceBounds,
  isSliceIndex,
  pathAlreadyApplied,
} from './utils'

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

  describe('PathAlreadyApplied', () => {
    it('should return true if path is included in already applied paths', () => {
      expect(pathAlreadyApplied(['foo', 123, 'bar'], [['foo', 123, 'bar']])).toBe(true)
      expect(pathAlreadyApplied(['foo', 123, 'bar'], [['foo', 123, 'bar', 'baz']])).toBe(true)
      expect(pathAlreadyApplied(['foo', 123, 'bar'], [[], ['bar'], ['foo', 123, 'bar', 'baz']])).toBe(true)
      expect(pathAlreadyApplied([], [['foo']])).toBe(true)
    })

    it('should return false if path isn\'t included in already applied paths', () => {
      expect(pathAlreadyApplied(['foo', 123, 'bar'], [])).toBe(false)
      expect(pathAlreadyApplied(['foo', 123, 'bar'], [['foo', 123]])).toBe(false)
      expect(pathAlreadyApplied(['foo', 123, 'bar'], [['foo', 123, 'baz']])).toBe(false)
    })

    it('should return false if already applied paths contain slices', () => {
      expect(pathAlreadyApplied(['foo', 123, 'bar'], [['foo', 123, 'bar', 'baz', [0, 10]]])).toBe(false)
    })
  })
})
