/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { trim } from 'string'

describe('string.trim', () => {

  it('should strip whitespaces at start and end', () => {
    immutaTest((input, path) => {
      const output = trim(input, path)
      expect(output).toEqual({ nested: { prop: 'Hello World !' } })
      return output
    }, { nested: { prop: '   Hello World !   ' } }, 'nested.prop')
  })
})
