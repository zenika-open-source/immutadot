/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { trimRight } from 'string'

describe('string.trimRight', () => {

  it('should strip whitespaces at end', () => {
    immutaTest((input, path) => {
      const output = trimRight(input, path)
      expect(output).toEqual({ nested: { prop: '   Hello World !' } })
      return output
    }, { nested: { prop: '   Hello World !   ' } }, 'nested.prop')
  })
})
