/* eslint-env jest */
import {
  isSymbol,
  toString,
} from 'util/lang'

describe('Lang utils', () => {
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

  describe('ToString', () => {
    it('should return string representation', () => {
      expect(toString()).toBe('undefined')
      expect(toString(null)).toBe('null')
      expect(toString('🍺')).toBe('🍺')
      expect(toString(666)).toBe('666')
    })
  })
})
