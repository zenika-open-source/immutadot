/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { toLocaleUpperCase } from 'string'

describe('string.toLocaleUpperCase', () => {

  it('should replace lower case letters by capitals', () => {
    immutaTest((input, path) => {
      const output = toLocaleUpperCase(input, path, 'fr-FR')
      expect(output).toEqual({ nested: { prop: 'ÇA VA BIEN ?' } })
      return output
    }, { nested: { prop: 'çA vA Bien ?' } }, 'nested.prop')
  })
})
