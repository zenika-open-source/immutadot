/* eslint-env jest */
import {
  isNaturalInteger,
  isNil,
  isObject,
  isSymbol,
  length,
  toString,
} from 'util/lang'

describe('Lang utils', () => {
  describe('IsNaturalInteger', () => {
    it('should return true for any non negative integer', () => {
      expect(isNaturalInteger(0)).toBe(true)
      expect(isNaturalInteger(1)).toBe(true)
      expect(isNaturalInteger(6)).toBe(true)
      expect(isNaturalInteger(100000000000)).toBe(true)
    })

    it('should return false for any negative integer', () => {
      expect(isNaturalInteger(-1)).toBe(false)
      expect(isNaturalInteger(-6)).toBe(false)
      expect(isNaturalInteger(-100000000000)).toBe(false)
    })

    it('should return false for any non integer', () => {
      expect(isNaturalInteger(undefined)).toBe(false)
      expect(isNaturalInteger(null)).toBe(false)
      expect(isNaturalInteger(true)).toBe(false)
      expect(isNaturalInteger({})).toBe(false)
      expect(isNaturalInteger([])).toBe(false)
      expect(isNaturalInteger('')).toBe(false)
      expect(isNaturalInteger(.6)).toBe(false)
    })
  })

  describe('IsNil', () => {
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

  describe('IsSymbol', () => {
    it('should return true for symbols', () => {
      expect(isSymbol(Symbol())).toBe(true)
      expect(isSymbol(Symbol('🍺'))).toBe(true)
      expect(isSymbol(Symbol.for('🍺'))).toBe(true)
    })

    it('should return false for non symbols', () => {
      expect(isSymbol('🍺')).toBe(false)
      expect(isSymbol(666)).toBe(false)
      expect(isSymbol({})).toBe(false)
    })
  })

  describe('Length', () => {
    it('should return length of array', () => {
      expect(length(Array(666))).toBe(666)
      expect(length([])).toBe(0)
      expect(length([1, 2, 3])).toBe(3)
    })

    it('should return zero if arg has no length', () => {
      expect(length({})).toBe(0)
      expect(length(666)).toBe(0)
      expect(length()).toBe(0)
      expect(length(null)).toBe(0)
    })
  })

  describe('ToString', () => {
    it('should return string representation', () => {
      expect(toString()).toBe('undefined')
      expect(toString(null)).toBe('null')
      expect(toString('🍺')).toBe('🍺')
      expect(toString(666)).toBe('666')
    })
  })

  describe('isObject', () => {
    it('should return true for object', () => {
      expect(isObject({})).toBe(true)
    })

    it('should return true for array', () => {
      expect(isObject([])).toBe(true)
    })

    it('should return true for function', () => {
      const func = () => 1
      expect(isObject(func)).toBe(true)
    })

    it('should return true for string', () => {
      expect(isObject('')).toBe(false)
    })

    it('should return true for number', () => {
      expect(isObject(1)).toBe(false)
    })

    it('should return true for instance of wrappers', () => {
      /* eslint-disable no-new-wrappers */
      expect(isObject(new Number(1))).toBe(true)
      expect(isObject(new String(''))).toBe(true)
      expect(isObject(new Boolean(true))).toBe(true)
      /* eslint-enable no-new-wrappers */
    })
  })
})
