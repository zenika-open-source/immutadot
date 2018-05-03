/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { substr } from 'string'
describe('string.substr', () => {
  it('should return a slice to the end', () => {
    immutaTest({ nested: { prop: 'Hello World !' } }, ['nested.prop'], (input, path) => {
      const output = substr(input, path, 6)
      expect(output).toEqual({ nested: { prop: 'World !' } })
      return output
    })
  })
  it('should return a slice', () => {
    immutaTest({ nested: { prop: 'Hello World !' } }, ['nested.prop'], (input, path) => {
      const output = substr(input, path, 6, 5)
      expect(output).toEqual({ nested: { prop: 'World' } })
      return output
    })
  })
})
