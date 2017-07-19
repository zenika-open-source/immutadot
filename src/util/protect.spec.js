/* eslint-env jest */
import protect from './protect'

describe('Protect', () => {
  it('should return properties value', () => {
    const object = {
      a: 1,
      b: { c: 3 },
    }

    protect(object)(proxy => {
      expect(proxy.a).toEqual(1)
      expect(proxy.b.c).toEqual(3)
    })
  })

  it('should not proxy non object values', () => {
    expect(() => protect(undefined)).toThrow(TypeError)
  })
})
