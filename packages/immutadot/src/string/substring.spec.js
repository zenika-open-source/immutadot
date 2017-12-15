/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { substring } from 'string'

describe('string.substring', () => {

  it('should return a slice to the end', () => {
    immutaTest((input, path) => {
      const output = substring(input, path, 6)
      expect(output).toEqual({ nested: { prop: 'World !' } })
      return output
    }, { nested: { prop: 'Hello World !' } }, 'nested.prop')
  })

  it('should return a slice', () => {
    immutaTest((input, path) => {
      const output = substring(input, path, 6, 11)
      expect(output).toEqual({ nested: { prop: 'World' } })
      return output
    }, { nested: { prop: 'Hello World !' } }, 'nested.prop')
  })
})
