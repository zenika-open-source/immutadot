/* eslint-env jest */
import { isSymbol } from 'util/isSymbol'

describe('IsSymbol', () => {
  it('should return true for symbols', () => {
    expect(isSymbol(Symbol())).toBe(true)
    expect(isSymbol(Symbol('🍺'))).toBe(true)
    expect(isSymbol(Symbol.for('🍺'))).toBe(true)
  })

  it('should return true for symbols', () => {
    expect(isSymbol('🍺')).toBe(false)
    expect(isSymbol(666)).toBe(false)
    expect(isSymbol({})).toBe(false)
  })
})
