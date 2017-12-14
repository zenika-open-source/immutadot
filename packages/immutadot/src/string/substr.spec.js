/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { substr } from 'string'

describe('string.substr', () => {

  it('should return a slice to the end', () => {
    immutaTest((input, path) => {
      const output = substr(input, path, 6)
      expect(output).toEqual({ nested: { prop: 'World !' } })
      return output
    }, { nested: { prop: 'Hello World !' } }, 'nested.prop')
  })

  it('should return a slice', () => {
    immutaTest((input, path) => {
      const output = substr(input, path, 6, 5)
      expect(output).toEqual({ nested: { prop: 'World' } })
      return output
    }, { nested: { prop: 'Hello World !' } }, 'nested.prop')
  })
})
