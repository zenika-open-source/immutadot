/* eslint-env jest */
import {
  isFunction,
  isNaturalInteger,
  isNil,
  isString,
  length,
  toString,
} from './lang'

describe('Lang utils', () => {
  describe('util.isFunction', () => {
    it('should return true for functions', () => {
      expect(isFunction(() => { /* */ })).toBe(true)

      function thisIsAFunction() { /* */ }
      expect(isFunction(thisIsAFunction)).toBe(true)
    })
    it('should return false for non strings', () => {
      expect(isFunction('')).toBe(false)
      expect(isFunction('\uD83C\uDF7A')).toBe(false)
      expect(isFunction([])).toBe(false)
      expect(isFunction(666)).toBe(false)
      expect(isFunction({})).toBe(false)
      expect(isFunction(undefined)).toBe(false)
      expect(isFunction(null)).toBe(false)
    })
  })
  describe('util.isNaturalInteger', () => {
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
      expect(isNaturalInteger(0.6)).toBe(false)
    })
  })
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
      expect(isNil(0.6)).toBe(false)
      expect(isNil('null')).toBe(false)
      expect(isNil('undefined')).toBe(false)
    })
  })
  describe('util.isString', () => {
    it('should return true for strings', () => {
      expect(isString('')).toBe(true)
      expect(isString('\uD83C\uDF7A')).toBe(true)
    })
    it('should return false for non strings', () => {
      expect(isString([])).toBe(false)
      expect(isString(666)).toBe(false)
      expect(isString({})).toBe(false)
      expect(isString(undefined)).toBe(false)
      expect(isString(null)).toBe(false)
    })
  })
  describe('util.length', () => {
    it('should return length of array', () => {
      expect(length(Array(666))).toBe(666)
      expect(length([])).toBe(0)
      expect(length([
        1,
        2,
        3,
      ])).toBe(3)
    })
    it('should return zero if arg has no length', () => {
      expect(length({})).toBe(0)
      expect(length(666)).toBe(0)
      expect(length()).toBe(0)
      expect(length(null)).toBe(0)
    })
  })
  describe('util.toString', () => {
    it('should return string representation', () => {
      expect(toString()).toBe('undefined')
      expect(toString(null)).toBe('null')
      expect(toString('\uD83C\uDF7A')).toBe('\uD83C\uDF7A')
      expect(toString(666)).toBe('666')
    })
  })
})
