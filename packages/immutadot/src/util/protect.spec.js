/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { protect } from 'util'

describe('util.protect', () => {
  it.skip('should return properties value', () => {
    immutaTest(input => {
      const output = protect(input)(protectedInput => {
        protectedInput.a++
        protectedInput.d = '666'
        protectedInput.b.c = `🍺 ${protectedInput.d} 🍺`
        delete protectedInput.e
      })
      expect(output).toEqual({
        a: 2,
        b: { c: '🍺 666 🍺' },
        d: '666',
        other: {},
      })
      return output
    }, {
      a: 1,
      b: { c: 3 },
      e: 'aze',
      other: {},
    }, 'a', 'd', 'b.c', 'e')
  })

  it.skip('should not proxy non object values', () => {
    expect(() => protect(undefined)).toThrow(TypeError)
  })
})
