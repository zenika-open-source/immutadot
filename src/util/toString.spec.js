/* eslint-env jest */
import { toString } from 'util/toString'

describe('ToString', () => {
  it('should return string representation', () => {
    expect(toString()).toBe('undefined')
    expect(toString(null)).toBe('null')
    expect(toString('🍺')).toBe('🍺')
    expect(toString(666)).toBe('666')
  })
})
