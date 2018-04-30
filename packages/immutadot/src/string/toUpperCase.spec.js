/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { toUpperCase } from 'string'
describe('string.toUpperCase', () => {
  it('should replace lower case letters by capitals', () => {
    immutaTest({ nested: { prop: 'Hello world !' } }, ['nested.prop'], (input, path) => {
      const output = toUpperCase(input, path)
      expect(output).toEqual({ nested: { prop: 'HELLO WORLD !' } })
      return output
    })
  })
})
