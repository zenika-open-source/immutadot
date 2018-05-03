/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { slice } from 'string'
describe('string.slice', () => {
  it('should return a slice to the end', () => {
    immutaTest({ nested: { prop: 'Hello World !' } }, ['nested.prop'], (input, path) => {
      const output = slice(input, path, 6)
      expect(output).toEqual({ nested: { prop: 'World !' } })
      return output
    })
  })
  it('should return a slice', () => {
    immutaTest({ nested: { prop: 'Hello World !' } }, ['nested.prop'], (input, path) => {
      const output = slice(input, path, 6, 11)
      expect(output).toEqual({ nested: { prop: 'World' } })
      return output
    })
  })
})
