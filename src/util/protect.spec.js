/* eslint-env jest */
import { immutaTest } from 'test.utils'
import protect from './protect'

describe('Protect', () => {
  it('should return properties value', () => {
    immutaTest(input => {
      const output = protect(input)(protectedInput => {
        protectedInput.d = '666'
        protectedInput.b.c = `🍺 ${protectedInput.d} 🍺`
      }).value()
      expect(output).toEqual({
        a: 1,
        b: { c: '🍺 666 🍺' },
        d: '666',
      })
      return output
    }, {
      a: 1,
      b: { c: 3 },
    }, 'd', 'b.c')
  })

  it('should not proxy non object values', () => {
    expect(() => protect(undefined)).toThrow(TypeError)
  })
})
