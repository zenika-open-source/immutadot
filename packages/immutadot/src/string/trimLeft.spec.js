/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { trimLeft } from 'string'

describe('string.trimLeft', () => {

  it('should strip whitespaces at start and end', () => {
    immutaTest((input, path) => {
      const output = trimLeft(input, path)
      expect(output).toEqual({ nested: { prop: 'Hello World !   ' } })
      return output
    }, { nested: { prop: '   Hello World !   ' } }, 'nested.prop')
  })
})
