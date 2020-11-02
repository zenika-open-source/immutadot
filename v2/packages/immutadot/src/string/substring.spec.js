/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { substring } from 'string'

describe('string.substring', () => {
  it('should return a slice to the end', () => {
    immutaTest({ nested: { prop: 'Hello World !' } }, ['nested.prop'], (input, path) => {
      const output = substring(input, path, 6)
      expect(output).toEqual({ nested: { prop: 'World !' } })
      return output
    })

    immutaTest({ nested: { prop: 'Hello World !' } }, ['nested.prop'], (input, path) => {
      const output = substring(path)(6)(input)
      expect(output).toEqual({ nested: { prop: 'World !' } })
      return output
    })
  })

  it('should return a slice', () => {
    immutaTest({ nested: { prop: 'Hello World !' } }, ['nested.prop'], (input, path) => {
      const output = substring(input, path, 6, 11)
      expect(output).toEqual({ nested: { prop: 'World' } })
      return output
    })

    immutaTest({ nested: { prop: 'Hello World !' } }, ['nested.prop'], (input, path) => {
      const output = substring(path)(6, 11)(input)
      expect(output).toEqual({ nested: { prop: 'World' } })
      return output
    })
  })
})
