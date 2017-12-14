/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { toLocaleLowerCase } from 'string'

describe('string.toLocaleLowerCase', () => {

  it('should replace capitals by lowercase', () => {
    immutaTest((input, path) => {
      const output = toLocaleLowerCase(input, path, 'fr-FR')
      expect(output).toEqual({ nested: { prop: 'ça va bien ?' } })
      return output
    }, { nested: { prop: 'ÇA vA Bien ?' } }, 'nested.prop')
  })
})
